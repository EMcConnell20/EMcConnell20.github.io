// -- Imports -- //

use crate::MAX_STRING_LENGTH;
use crate::naming::{NameID, NameSpace};
use crate::objects::{Expr, Object};

// -- Exports -- //

pub(crate) fn format(expr: &Expr) -> String {
	let mut p = Printer {
		active_copies: vec![0; expr.name_space.get_copies().len()],
		local_ids: Vec::new(),
	};
	
	p.string_this(&expr.object, &expr.name_space, 0)
}

// -- Printer Object -- //

struct Printer {
	active_copies: Vec<usize>,
	local_ids: Vec<Vec<(NameID, usize)>>,
}

impl Printer {
	fn string_this(&mut self, object: &Object, name_space: &NameSpace, depth: usize) -> String {
		match object {
			Object::Term { name } => {
				let true_id = name_space.get_absolute_name_index(*name);
				name_space[true_id].clone()
			}
			
			Object::Var { depth, queue_position } => {
				let index = self.local_ids.len() - 1 - depth;
				let (name_id, suffix) = self.local_ids[index][*queue_position];
				let out = name_space[name_id].clone();
				if suffix != 0 { format!("{out}_{suffix}") }
				else { out }
			}
			
			Object::Func { vars, inner } => {
				let mut locals = Vec::<(NameID, usize)>::with_capacity(vars.len());
				for (name_id, _) in vars {
					let true_id = name_space.get_absolute_name_index(*name_id);
					locals.push((true_id, self.active_copies[true_id]));
					self.active_copies[true_id] += 1;
				}
				
				let mut position_counter = inner.len();
				let mut out = Vec::<String>::with_capacity(position_counter + locals.len());
				
				for (name_id, copy_id) in locals.iter() {
					if *copy_id == 0 {
						out.push(format!("λ{}.", &name_space[*name_id]));
					} else {
						out.push(format!("λ{}_{copy_id}.", &name_space[*name_id]));
					}
				}
				
				// Removes the unnecessary trailing '.' if the function has no inner contents.
				if inner.len() == 0 && let Some(s) = out.last_mut() { s.pop(); }
				self.local_ids.push(locals);
				
				for o in inner {
					position_counter -= 1;
					
					let mut s = self.string_this(o, name_space, depth + 1);
					if position_counter != 0 { s.push(' '); }
					out.push(s);
				}
				
				let locals = self.local_ids.pop().unwrap();
				for name_id in locals {
					self.active_copies[name_id.0] -= 1;
				}
				
				
				let out = if depth == 0 { format!("{}", out.into_iter().collect::<String>()) }
				else { format!("({})", out.into_iter().collect::<String>()) };
				
				
				if out.len() < MAX_STRING_LENGTH { String::from("error: character limit exceeded") }
				else { out }
			}
		}
	}
}
