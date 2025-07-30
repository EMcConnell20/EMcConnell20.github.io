// -- Imports -- //

use crate::MAX_NUMBER_INPUT;
use crate::errors::{Result, LambdaError};

use regex::Regex;
use wasm_bindgen::prelude::wasm_bindgen;

use std::sync::LazyLock;
use std::collections::HashMap;

// -- Typing -- //

#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Token {
	Open,
	Close,
	Var(String),
	Func(String),
}

#[wasm_bindgen]
#[derive(Clone, Debug)]
pub struct Parser {
	keywords: HashMap<String, Vec<Token>>,
}

// -- Tokenizing -- //

#[wasm_bindgen]
impl Parser {
	pub fn new() -> Self {
		#[cfg(feature = "panic_hook")]
		console_error_panic_hook::set_once();
		
		Self { keywords: HashMap::new() }
	}
	
	pub fn create_keyword(&mut self, name: String, expression: String) -> String {
		let name = name.trim().to_string();
		let expression = expression.trim().to_string();
		
		if name.is_empty() || expression.is_empty() { return String::new() }
		if self.add_keyword(name, expression.clone()).is_err() { String::new() }
		else { expression }
	}
	
	pub fn remove_keyword(&mut self, name: String) { self.keywords.remove(name.trim()); }
}

impl Parser {
	pub(crate) fn tokenize(&self, text: String, keyword_name: Option<&str>) -> Result<Vec<Token>> {
		let mut tokens = Vec::<Token>::new();
		let mut expecting_function_variable = false;
		let mut expecting_function_point = false;
		let mut closure_depth = 0;
		
		for m in EXPRESSION_PARSER.find_iter(text.trim()) {
			match m.as_str().trim() {
				"(" => {
					if expecting_function_variable { return Err(LambdaError::InvalidName("(".to_string())); }
					if expecting_function_point { return Err(LambdaError::UnexpectedCharacter('(')) }
					
					closure_depth += 1;
					tokens.push(Token::Open);
				}
				
				")" => {
					if expecting_function_variable { return Err(LambdaError::InvalidName(")".to_string())); }
					if expecting_function_point { return Err(LambdaError::UnexpectedCharacter(')')) }
					if closure_depth == 0 { return Err(LambdaError::UnmatchedParenthesis) }
					
					closure_depth -= 1;
					tokens.push(Token::Close);
				}
				
				"λ" => {
					if expecting_function_variable { return Err(LambdaError::InvalidName("λ".to_string())); }
					if expecting_function_point { return Err(LambdaError::UnexpectedCharacter('λ')) }
					if tokens.len() == 0 {
						tokens.push(Token::Open);
						closure_depth += 1;
					}
					
					expecting_function_variable = true;
				}
				
				"." => {
					if expecting_function_variable { return Err(LambdaError::InvalidName(".".to_string())) }
					if !expecting_function_point { return Err(LambdaError::UnexpectedCharacter('.')) }
					expecting_function_point = false;
				}
				
				name => {
					if expecting_function_point { return Err(LambdaError::UnexpectedCharacter('.')) }
					if expecting_function_variable {
						if !VARIABLE_VALIDATOR.is_match(name) { return Err(LambdaError::InvalidName(name.to_string())) }
						
						if let Some(key_name) = keyword_name {
							if self.keywords.contains_key(name) && name != key_name {
								return Err(LambdaError::ReservedName(name.to_string()))
							}
							tokens.push(Token::Func(format!("${key_name}${name}")));
						} else {
							if self.keywords.contains_key(name) {
								return Err(LambdaError::ReservedName(name.to_string()))
							}
							tokens.push(Token::Func(name.to_owned()));
						}
						
						expecting_function_variable = false;
						expecting_function_point = true;
					} else if let Some(tks) = self.keywords.get(name) {
						if let Some(key_name) = keyword_name && name == key_name { return Err(LambdaError::ActiveName(name.to_string())) }
						tokens.append(&mut tks.clone());
					} else if NUMBER_VALIDATOR.is_match(name) {
						let Ok(num) = name.parse::<usize>() else { return Err(LambdaError::InternalFailure) };
						if num > MAX_NUMBER_INPUT { return Err(LambdaError::NumberTooLarge(num)) }
						
						tokens.push(Token::Open);
						tokens.push(Token::Func("$#$f".to_string()));
						tokens.push(Token::Func("$#$x".to_string()));
						for _ in 1..num {
							tokens.push(Token::Var("$#$f".to_string()));
							tokens.push(Token::Open);
						}
						
						if num != 0 { tokens.push(Token::Var("$#$f".to_string())) }
						tokens.push(Token::Var("$#$x".to_string()));
						
						for _ in 1..num {
							tokens.push(Token::Close);
						}
						
						tokens.push(Token::Close);
					} else if VARIABLE_VALIDATOR.is_match(name) {
						if tokens.len() == 0 {
							tokens.push(Token::Open);
							closure_depth += 1;
						}
						
						if let Some(key_name) = keyword_name {
							tokens.push(Token::Var(format!("${key_name}${name}")))
						} else {
							tokens.push(Token::Var(name.to_owned()));
						}
					} else {
						return Err(LambdaError::InvalidName(name.to_string()));
					}
				}
			}
		}
		
		if expecting_function_variable || expecting_function_point { return Err(LambdaError::IncompleteFunction) }
		for _ in 0..closure_depth { tokens.push(Token::Close) }
		
		Ok(tokens)
	}
	
	fn add_keyword(&mut self, name: String, expression: String) -> Result<()> {
		if name.trim().is_empty() || expression.trim().is_empty() { return Err(LambdaError::InternalFailure) }
		if !KEYWORD_VALIDATOR.is_match(name.trim()) { return Err(LambdaError::InvalidKeyword(name)) }
		
		let tokens = self.tokenize(expression, Some(name.trim()))?;
		if tokens.is_empty() { return Err(LambdaError::InvalidKeyword(name)) };
		
		self.keywords.insert(name, tokens);
		
		Ok(())
	}
}

// -- RegEx -- //

static EXPRESSION_PARSER: LazyLock<Regex> = LazyLock::new(|| {
	Regex::new(r"([()λ.]|[0-9]+|[+\-*/%^&|!?<>=]+|\S\w*)").unwrap()
});

static VARIABLE_VALIDATOR: LazyLock<Regex> = LazyLock::new(|| {
	Regex::new(r"\A[a-zA-Z]\w*\z").unwrap()
});

static NUMBER_VALIDATOR: LazyLock<Regex> = LazyLock::new(|| {
	Regex::new(r"\A[0-9]+\z").unwrap()
});

static KEYWORD_VALIDATOR: LazyLock<Regex> = LazyLock::new(|| {
	Regex::new(r"\A[+\-*/%^&|!?<>=]+\z|\A[a-zA-Z]\w*\z").unwrap()
});

pub static KEYWORD_VARIABLE_TEST: LazyLock<Regex> = LazyLock::new(|| {
	Regex::new(r"\A\$\S+?\$").unwrap()
});
