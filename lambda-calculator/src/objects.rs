// -- Imports -- //

use crate::MAX_OBJECT_DEPTH;
use crate::errors::{LambdaError, Result};
use crate::naming::{NameID, CopyID, NameSpace};

use std::collections::VecDeque;
use std::cell::Cell;

// -- Expr -- //

#[derive(Clone, Debug)]
pub(crate) struct Expr {
	pub(crate) object: Object,
	pub(crate) name_space: NameSpace,
}

impl Expr {
	pub fn new(object: Object, name_space: NameSpace) -> Self { Self { object, name_space } }
	
	pub fn reduce(&mut self) -> Result<()> { self.object.reduce(&mut self.name_space) }
}

// -- Objects -- //

#[derive(Clone, Debug)]
pub(crate) enum Object {
	Func { vars: VecDeque<(NameID, Cell<CopyID>)>, inner: VecDeque<Object> },
	Var { depth: usize, queue_position: usize },
	Term { name: NameID },
}

impl Object {
	pub fn reduce(&mut self, name_space: &mut NameSpace) -> Result<()> {
		// DOCS Return early if self isn't a Func.
		let Self::Func {
			vars: parent_vars,
			inner: objects
		} = self else { return Ok(()) };
		
		// DOCS Return early if self is empty.
		let Some(hold) = objects.pop_front() else { return Ok(()) };
		
		let (hold, cycles) = hold.reduce_in_closure(objects, name_space)?;
		objects.push_back(hold);
		
		// Cycles the front object to the front.
		for _ in 0..cycles {
			let mut temp = objects.pop_front().unwrap();
			temp.reduce(name_space)?;
			objects.push_back(temp);
		}
		
		// Lowers single item closures. `(a) => a`
		if parent_vars.is_empty() && objects.len() == 1 {
			let mut pop = objects.pop_front().unwrap();
			pop.lower(0);
			*self = pop;
		}
		
		Ok(())
	}
	
	fn reduce_in_closure(mut self, objects: &mut VecDeque<Object>, name_space: &mut NameSpace) -> Result<(Self, usize)> {
		let mut remaining_objects = objects.len();
		
		'reduction: while remaining_objects != 0 {
			self.reduce(name_space)?;
			self.expand_closures(objects, &mut remaining_objects, name_space);
			
			let Self::Func {
				mut vars,
				mut inner
			} = self else { break 'reduction };
			
			// This covers cases with blank closures.
			if vars.is_empty() {
				self = Self::Func { vars, inner };
				break 'reduction;
			}
			
			vars.pop_front();
			remaining_objects -= 1;
			let beta = objects.pop_front().unwrap();
			
			for o in inner.iter_mut() { o.apply_beta(name_space, &beta, 0)? }
			
			// TODO name_space.drop_beta(beta);
			
			self = Self::Func { vars, inner };
		}
		
		self.reduce(name_space)?;
		self.expand_closures(objects, &mut remaining_objects, name_space);
		
		Ok((self, remaining_objects))
	}
	
	fn apply_beta(&mut self, name_space: &mut NameSpace, beta: &Self, recursion_depth: usize) -> Result<()> {
		match self {
			Self::Term { name: _ } => (),
			
			Self::Var { depth, queue_position } => {
				if *depth == recursion_depth {
					if *queue_position == 0 {
						*self = beta.cloned(name_space, recursion_depth, 0)?;
					} else {
						*queue_position -= 1;
					}
				}
			}
			
			Self::Func { vars: _, inner } =>
				for o in inner.iter_mut() {
					o.apply_beta(name_space, beta, recursion_depth + 1)?;
				}
		}
		
		Ok(())
	}
}

// -- Object Depth Mutations -- //

impl Object {
	fn cloned(&self, name_space: &mut NameSpace, origin_offset: usize, recursion_depth: usize) -> Result<Self> {
		if origin_offset + recursion_depth > MAX_OBJECT_DEPTH { return Err(LambdaError::ExpressionSizeLimit) };
		
		match self {
			Self::Var { depth, queue_position } =>
				if *depth < recursion_depth { Ok(self.clone()) }
				else { Ok(Self::Var { depth: depth + origin_offset + 1, queue_position: *queue_position }) },
			// DOCS The +1 depth accounts for the initial offset of being raised into a
			// 		function. "origin_offset" is only the recursive depth within the
			// 		function, meaning that the x in "(λx.x)" has an origin offset of 0.
			
			Self::Term { name: _ } =>
				Ok(self.clone()),
			
			Self::Func { vars, inner } => {
				let copies = name_space.get_mut_copies();
				let new_vars = vars
					.iter()
					.map(
						|(name_id, copy_id)| -> (NameID, Cell<CopyID>) {
							let out = (*name_id, copy_id.clone());
							
							copy_id.set(copies[*name_id]);
							copies[*name_id] += 1;
							
							out
						}
					).collect::<VecDeque<(NameID, Cell<CopyID>)>>();
				
				let mut new_inner= VecDeque::with_capacity(inner.len());
				for o in inner.iter() {
					new_inner.push_back(o.cloned(name_space, origin_offset, recursion_depth + 1)?);
				}
				
				Ok(Self::Func { vars: new_vars, inner: new_inner })
			}
		}
	}
	
	fn lowered(mut self) -> Self { self.lower(0); self }
	
	fn lower(&mut self, recursion_depth: usize) {
		match self {
			Self::Term { name: _ } =>
				(),
			
			Self::Var { depth, queue_position: _ } =>
				if *depth > recursion_depth { *depth -= 1 },
			
			Self::Func { vars: _, inner } =>
				inner.iter_mut().for_each(|o| o.lower(recursion_depth + 1)),
		}
	}
	
	fn expand_closures(
		&mut self,
		objects: &mut VecDeque<Object>,
		remaining_objects: &mut usize,
		name_space: &mut NameSpace
	) {
		let Self::Func {
			vars,
			inner
		} = self else { return };
		
		if vars.is_empty() && let Some(object) = inner.pop_front() {
			*remaining_objects += inner.len();
			inner
				.drain(0..inner.len())
				.rev()
				.for_each(
					|o| objects.push_front(o.lowered())
				);
			
			*self = object.lowered();
			self.expand_closures(objects, remaining_objects, name_space);
		}
	}
}

// -- Logging -- //

#[cfg(feature = "logging")]
use std::fmt::{Display, Formatter};

#[cfg(feature = "logging")]
impl Display for Expr {
	fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
		match &self.object {
			Object::Term { name } =>
				write!(f, "{}", remove_extra(self, *name)),
			
			Object::Var { depth: _, queue_position: _ } =>
				panic!(),
			
			Object::Func { vars, inner } => {
				let mut var_list = Vec::new();
				
				let s_1 = vars
					.iter()
					.map(|v| format!("λ{}.", remove_extra(self, v.0)))
					.collect::<String>();
				
				var_list.push(vars);
				
				let s_2 = inner
					.iter()
					.map(|o| format!("{} ", o.to_string(self, &mut var_list)))
					.collect::<String>()
					.trim()
					.to_string();
				
				var_list.pop();
				
				write!(f, "{}{}", s_1, s_2)
			}
		}
	}
}

#[cfg(feature = "logging")]
impl Object {
	fn to_string<'a>(&'a self, expr: &'a Expr, var_list: &mut Vec<&'a VecDeque<(NameID, Cell<CopyID>)>>) -> String {
		match self {
			Self::Term { name } =>
				remove_extra(expr, *name),
			
			Self::Var { depth, queue_position } =>
				remove_extra(expr, var_list[var_list.len() - 1 - *depth][*queue_position].0),
			
			Self::Func { vars, inner } => {
				let s_1 = vars
					.iter()
					.map(|v| format!("λ{}.", remove_extra(expr, v.0)))
					.collect::<String>();
				
				var_list.push(vars);
				
				let s_2 = inner
					.iter()
					.map(|o| format!("{} ", o.to_string(expr, var_list)))
					.collect::<String>()
					.trim()
					.to_string();
				
				var_list.pop();
				
				format!("({s_1}{s_2})")
			}
		}
	}
}

#[cfg(feature = "logging")]
fn remove_extra(expr: &Expr, name: NameID) -> String {
	use crate::parser::KEYWORD_VARIABLE_TEST;
	KEYWORD_VARIABLE_TEST.replace(&expr.name_space[name], "").to_string()
}
