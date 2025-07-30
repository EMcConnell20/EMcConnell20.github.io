// -- Imports -- //

use crate::objects::{Object, Expr};
use crate::errors::{LambdaError, Result};
use crate::naming::{CopyID, NameID, NameSpace};
use crate::parser::{Token, KEYWORD_VARIABLE_TEST};

use std::cell::Cell;
use std::collections::{HashMap, VecDeque};

// -- Exports -- //

pub fn build(tokens: Vec<Token>) -> Result<Expr> {
	let mut b = Builder {
		level: 0,
		names: HashMap::new(),
		listings: Vec::new(),
	};
	
	if tokens.len() == 0 { return Err(LambdaError::InternalFailure) }
	let mut iter: TokenStream = tokens.into_iter();
	
	let object = b.parse_closure(&mut iter, None)?;
	let mut copies = Vec::<CopyID>::with_capacity(b.listings.len());
	
	for s in b.listings.iter() {
		match b.names.get(s).unwrap() {
			Name::Term { name_id: _} =>
				copies.push(0),
			
			Name::Var { level: _, queue_position: _, copy_id } |
			Name::DeadVar { name_id: _, copy_id } =>
				copies.push(copy_id + 1),
		}
	}
	
	let remap = b.make_name_remap();
	
	Ok(Expr::new(object, NameSpace::new(b.listings, copies, remap)))
}

// -- Typing -- //

type TokenStream = std::vec::IntoIter<Token>;

#[derive(Copy, Clone, Debug)]
enum Name {
	Var { level: usize, queue_position: usize, copy_id: CopyID },
	DeadVar{ name_id: NameID, copy_id: CopyID },
	Term { name_id: NameID },
}

#[derive(Clone, Debug)]
struct Builder {
	level: usize,
	names: HashMap<String, Name>,
	listings: Vec<String>,
}

// -- Builder -- //

impl Builder {
	fn parse_closure(&mut self, iter: &mut TokenStream, name: Option<String>) -> Result<Object> {
		self.level += 1;
		
		let mut vars = VecDeque::<(NameID, Cell<CopyID>)>::new();
		
		if let Some(name) = name { self.add_func_name(&mut vars, name)? }
		
		let mut token = 'func_vars: loop {
			match iter.next() {
				None | Some(Token::Close) =>
					return self.end_closure(vars.clone(), VecDeque::new()),
				
				Some(Token::Func(name)) =>
					self.add_func_name(&mut vars, name)?,
				
				Some(tk) =>
					break 'func_vars tk,
			}
		};
		
		let mut inner = VecDeque::<Object>::new();
		
		'func_inner: loop {
			match token {
				Token::Open =>
					inner.push_back(self.parse_closure(iter, None)?),
				Token::Func(name) =>
					inner.push_back(self.parse_closure(iter, Some(name))?),
				Token::Var(name) =>
					inner.push_back(self.make_variable(name)?),
				Token::Close =>
					break 'func_inner,
			}
			
			token = if let Some(tk) = iter.next() { tk }
			else { break 'func_inner };
		}
		
		self.end_closure(vars, inner)
	}
	
	fn make_variable(&mut self, name: String) -> Result<Object> {
		match self.names.get(&name) {
			Some(Name::Term { name_id }) =>
				Ok(Object::Term { name: *name_id }),
			
			Some(Name::Var { level, queue_position, copy_id: _ }) =>
				Ok(Object::Var { depth: self.level - *level, queue_position: *queue_position }),
			
			Some(Name::DeadVar { .. }) =>
				Err(LambdaError::UnavailableName(name)),
			
			None => {
				let out = Object::Term { name: self.listings.len() };
				self.names.insert(name.clone(), Name::Term { name_id: self.listings.len() });
				self.listings.push(name);
				
				Ok(out)
			}
		}
	}
	
	fn add_func_name(&mut self, vars: &mut VecDeque<(NameID, Cell<CopyID>)>, name: String) -> Result<()> {
		match self.names.get(&name) {
			None => {
				self.names.insert(
					name.clone(),
					Name::Var {
						level: self.level,
						queue_position: vars.len(),
						copy_id: 0
					}
				);
				vars.push_back((self.listings.len(), Cell::new(0)));
				self.listings.push(name);
				
				Ok(())
			}
			
			Some(Name::DeadVar { name_id, copy_id }) => {
				let ids = (*name_id, *copy_id + 1);
				self.names.insert(
					name.clone(),
					Name::Var {
						level: self.level,
						queue_position: vars.len(),
						copy_id: ids.1,
					}
				);
				vars.push_back((ids.0, Cell::new(ids.1)));
				
				Ok(())
			}
			
			_ => Err(LambdaError::InternalFailure),
		}
	}
	
	fn end_closure(&mut self, vars: VecDeque<(NameID, Cell<CopyID>)>, inner: VecDeque<Object>) -> Result<Object> {
		self.level -= 1;
		
		for (name_id, copy_id) in vars.iter() {
			*self.names.get_mut(&self.listings[*name_id]).unwrap() = Name::DeadVar
			{ name_id: *name_id, copy_id: copy_id.get() };
		}
		
		Ok(Object::Func { vars, inner })
	}
	
	fn make_name_remap(&mut self) -> HashMap<NameID, NameID> {
		let mut remap = HashMap::<NameID, NameID>::new();
		
		for index in 0..self.listings.len() {
			let name = &self.listings[index];
			if KEYWORD_VARIABLE_TEST.is_match(name) {
				let short_name = KEYWORD_VARIABLE_TEST.replace(name, "").to_string();
				
				if let Some(base) = self.names.get_mut(&short_name) {
					let new_id = match base {
						Name::Term { name_id } => *name_id,
						Name::DeadVar { name_id, copy_id} => {
							*copy_id += 1;
							*name_id
						}
						
						Name::Var { .. } =>
							panic!()
					};
					
					remap.insert(index, new_id);
				} else {
					self.names.insert(short_name.clone(), Name::DeadVar { name_id: index, copy_id: 1 });
					self.listings[index] = short_name;
				}
			}
		}
		
		remap
	}
}
