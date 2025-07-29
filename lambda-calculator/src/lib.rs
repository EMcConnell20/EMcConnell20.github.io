// -- Modules -- //

mod parser;
mod builder;
mod naming;
mod objects;
mod printer;
mod errors;

// -- Imports -- //

use thiserror::__private::AsDynError;
use wasm_bindgen::prelude::*;

// -- Exports -- //

pub use crate::parser::Parser;

#[wasm_bindgen]
pub fn simplify(expression: String, parser: &Parser) -> String {
	if expression.is_empty() { return expression }
	
	solve(expression, parser).unwrap_or_else(|e| format!("{}", e.as_dyn_error()))
}

fn solve(s: String, p: &Parser) -> errors::Result<String> {
	let tokens = p.tokenize(s, None)?;
	let mut expr = builder::build(tokens)?;
	expr.reduce()?;
	Ok(printer::format(&expr))
}

// -- Configuration -- //

const MAX_NUMBER_INPUT: usize = 255;
const MAX_OBJECT_DEPTH: usize = 512;
const MAX_STRING_LENGTH: usize = 255;

// -- Debug -- //

#[cfg(feature = "logging")]
#[wasm_bindgen]
extern "C" {
	#[wasm_bindgen(js_namespace = console)]
	fn log(s: &str);
}
