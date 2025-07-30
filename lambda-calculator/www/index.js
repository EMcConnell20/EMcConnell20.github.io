"use strict";

// -- Imports -- //

import { Parser, simplify } from "lambda-calc-tool";
import { add_table_row } from "./modules/tabled";

// -- Consts -- //

/** @type {HTMLTextAreaElement} */
const input_box = document.getElementById("calc-box");
/** @type {HTMLTextAreaElement} */
const output_box = document.getElementById("output-box");
/** @type {HTMLInputElement} */
const key_box = document.getElementById("key-box");
/** @type {HTMLInputElement} */
const expr_box = document.getElementById("expr-box");
/** @type {HTMLButtonElement} */
const simplify_button = document.getElementById("button-simplify");
/** @type {HTMLButtonElement} */
const add_shorthand_button = document.getElementById("button-add-shorthand");
/** @type {HTMLButtonElement} */
const lambda_icon_button = document.getElementById("lambda-icon");

const parser = Parser.new();

// -- Functions -- //

const update_output_text = () => {
	output_box.value = simplify(input_box.value, parser);
}

const add_shorthand = () => {
	const test_key = key_box.value.trim();
	const test_expr = expr_box.value.trim();

	if (test_key !== "" && test_key !== test_expr) {
		let expr = parser.create_keyword(test_key, test_expr);
		if (expr.length === 0) { return };

		add_table_row(test_key, expr, parser);

		key_box.value = "";
		expr_box.value = "";
	}
}

// -- Runtime Init -- //

simplify_button.addEventListener("click", update_output_text);
add_shorthand_button.addEventListener("click", add_shorthand);
lambda_icon_button.addEventListener("click", (_) => {
	navigator.clipboard.writeText("λ").then(() => {}).catch();
})

parser.create_keyword("true", "λx.λy.x");
parser.create_keyword("false", "λx.λy.y");
parser.create_keyword("not", "λp.p false true");
parser.create_keyword("and", "λp.λq.p q p");
parser.create_keyword("or", "λp.λq.p p q");

add_table_row("true", "λx.λy.x", parser);
add_table_row("false", "λx.λy.y", parser);
add_table_row("not", "λp.p false true", parser);
add_table_row("and", "λp.λq.p q p", parser);
add_table_row("or", "λp.λq.p p q", parser);

parser.create_keyword("null", "λf.λx.x");
parser.create_keyword("succ", "λn.λf.λx.f (n f x)");
parser.create_keyword("pred", "λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)");

add_table_row("null", "λf.λx.x", parser);
add_table_row("succ", "λn.λf.λx.f (n f x)", parser);
add_table_row("pred", "λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)", parser);

parser.create_keyword("add", "λm.λn.m succ n");
parser.create_keyword("sub", "λm.λn.n pred m");
parser.create_keyword("mul", "λm.λn.m (add n) null");
parser.create_keyword("pow", "λb.λe.e b");

add_table_row("add", "λm.λn.m succ n", parser);
add_table_row("sub", "λm.λn.n pred m", parser);
add_table_row("mul", "λm.λn.m (add n) null", parser);
add_table_row("pow", "λb.λe.e b", parser);

parser.create_keyword("is_null", "λn.n (λx.false) true");
parser.create_keyword("is_ge", "λm.λn.is_null (sub n m)");
parser.create_keyword("is_le", "λm.λn.is_null (sub m n)");
parser.create_keyword("is_eq", "λm.λn.and (is_ge m n) (is_ge n m)");

add_table_row("is_null", "λn.n (λx.false) true", parser);
add_table_row("is_ge", "λm.λn.is_null (sub n m)", parser);
add_table_row("is_le", "λm.λn.is_null (sub m n)", parser);
add_table_row("is_eq", "λm.λn.and (is_ge m n) (is_le m n)", parser);

parser.create_keyword("++", "succ");
parser.create_keyword("--", "pred");

add_table_row("++", "succ", parser);
add_table_row("--", "pred", parser);

input_box.value = "";
output_box.value = "";
