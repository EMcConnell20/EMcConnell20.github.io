// -- Imports -- //

use thiserror::Error;

// -- Typing -- //

pub type Result<T> = core::result::Result<T, LambdaError>;

#[derive(Debug, Error)]
pub enum LambdaError {
	#[error("syntax error: unexpected '{0}' character")]
	UnexpectedCharacter(char),
	#[error("syntax error: \"{0}\" is not a valid variable name")]
	InvalidName(String),
	#[error("syntax error: incomplete lambda function declaration at the end of the expression")]
	IncompleteFunction,
	#[error("syntax error: \"{0}\" is not a valid keyword")]
	InvalidKeyword(String),
	#[error("syntax error: closing parenthesis without matching open parenthesis")]
	UnmatchedParenthesis,
	
	#[error("naming error: \"{0}\" is reserved as a keyword, so it cannot be assigned to a variable")]
	ReservedName(String),
	#[error("naming error: \"{0}\" has already been used as a function variable, so it cannot be used as a free term")]
	UnavailableName(String),
	#[error("naming error: \"{0}\" cannot be assigned multiple times in the same function")]
	ActiveName(String),
	
	#[error("input error: {0} is greater than maximum integer limit (255)")]
	NumberTooLarge(usize),
	
	#[error("internal error: an unforeseen error has occurred")]
	InternalFailure,
	#[error("internal error: expression reached the maximum size limit")]
	ExpressionSizeLimit,
}
