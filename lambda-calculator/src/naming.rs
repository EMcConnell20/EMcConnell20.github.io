// -- Imports -- //

use std::collections::HashMap;
use std::ops::{Index, IndexMut};

// -- Typing -- //

pub type NameID = usize;
pub type CopyID = usize;

#[derive(Clone, Debug)]
pub struct NameSpace {
	names: Vec<String>,
	copies: Vec<CopyID>,
	renames: HashMap<NameID, NameID>,
}

impl NameSpace {
	pub fn new(
		names: Vec<String>,
		copies: Vec<CopyID>,
		renames: HashMap<NameID, NameID>
	) -> Self { Self { names, copies, renames } }
}

// -- Indexing -- //

impl Index<NameID> for NameSpace {
	type Output = String;
	
	fn index(&self, index: NameID) -> &Self::Output { &self.names[index] }
}

impl IndexMut<NameID> for NameSpace {
	fn index_mut(&mut self, index: NameID) -> &mut Self::Output { &mut self.names[index] }
}

impl NameSpace {
	pub fn get_copies(&self) -> &Vec<CopyID> { &self.copies }
	pub fn get_mut_copies(&mut self) -> &mut Vec<CopyID> { &mut self.copies }
	
	pub fn get_absolute_name_index(&self, name_id: NameID) -> NameID {
		*self.renames.get(&name_id).unwrap_or(&name_id)
	}
}
