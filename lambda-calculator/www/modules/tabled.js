"use strict";

// -- Imports -- /

import { Parser } from "lambda-calc-tool";

// -- Exports -- //

/**
 * @param {string} name
 * @param {string} expression
 * @param {Parser} parser
 */
export const add_table_row = (name, expression, parser) => {
	const named_row = get_named_row(name, parser);
	named_row.cells[1].textContent = expression;
}

// -- Impls -- //

/** @type {HTMLTableSectionElement} */
const tbody = document.getElementById("table-body");

/**
 * @param {string} name
 * @param {Parser} parser
 * @return {HTMLTableRowElement}x
 */
const get_named_row = (name, parser) => {
	for (let i = 0; i < tbody.rows.length; ++i) {
		if (tbody.rows[i].cells[0].textContent === name) {
			return tbody.rows[i];
		}
	}

	const named_row = tbody.insertRow();
	const del_button = document.createElement("button");
	del_button.type = "button";
	del_button.className = "button-delete-shorthand";
	del_button.textContent = "–";
	del_button.title = "Remove Shorthand";
	del_button.addEventListener("click", (_) => {
		parser.remove_keyword(named_row.cells[0].textContent);
		named_row.remove();
	});

	named_row.insertCell(0).textContent = name;
	named_row.insertCell(1);
	named_row.insertCell(2).appendChild(del_button);

	return named_row;
}
