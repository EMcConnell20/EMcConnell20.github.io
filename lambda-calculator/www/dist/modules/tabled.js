/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../pkg/lambda_calculator.js":
/*!***********************************!*\
  !*** ../pkg/lambda_calculator.js ***!
  \***********************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Parser: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.Parser),\n/* harmony export */   __wbg_error_7534b8e9a36f1ab4: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_error_7534b8e9a36f1ab4),\n/* harmony export */   __wbg_new_8a6f238a6ece86ea: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_new_8a6f238a6ece86ea),\n/* harmony export */   __wbg_set_wasm: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_set_wasm),\n/* harmony export */   __wbg_stack_0ed75d68575b0f3c: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_stack_0ed75d68575b0f3c),\n/* harmony export */   __wbindgen_init_externref_table: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_init_externref_table),\n/* harmony export */   __wbindgen_throw: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbindgen_throw),\n/* harmony export */   simplify: () => (/* reexport safe */ _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.simplify)\n/* harmony export */ });\n/* harmony import */ var _lambda_calculator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lambda_calculator_bg.wasm */ \"../pkg/lambda_calculator_bg.wasm\");\n/* harmony import */ var _lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lambda_calculator_bg.js */ \"../pkg/lambda_calculator_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lambda_calculator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);\n_lambda_calculator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n(0,_lambda_calculator_bg_js__WEBPACK_IMPORTED_MODULE_1__.__wbg_set_wasm)(_lambda_calculator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__);\n_lambda_calculator_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_start();\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://create-wasm-app/../pkg/lambda_calculator.js?\n}");

/***/ }),

/***/ "../pkg/lambda_calculator_bg.js":
/*!**************************************!*\
  !*** ../pkg/lambda_calculator_bg.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Parser: () => (/* binding */ Parser),\n/* harmony export */   __wbg_error_7534b8e9a36f1ab4: () => (/* binding */ __wbg_error_7534b8e9a36f1ab4),\n/* harmony export */   __wbg_new_8a6f238a6ece86ea: () => (/* binding */ __wbg_new_8a6f238a6ece86ea),\n/* harmony export */   __wbg_set_wasm: () => (/* binding */ __wbg_set_wasm),\n/* harmony export */   __wbg_stack_0ed75d68575b0f3c: () => (/* binding */ __wbg_stack_0ed75d68575b0f3c),\n/* harmony export */   __wbindgen_init_externref_table: () => (/* binding */ __wbindgen_init_externref_table),\n/* harmony export */   __wbindgen_throw: () => (/* binding */ __wbindgen_throw),\n/* harmony export */   simplify: () => (/* binding */ simplify)\n/* harmony export */ });\nlet wasm;\nfunction __wbg_set_wasm(val) {\n    wasm = val;\n}\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8ArrayMemory0 = null;\n\nfunction getUint8ArrayMemory0() {\n    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {\n        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8ArrayMemory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nconst lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;\n\nlet cachedTextEncoder = new lTextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length, 1) >>> 0;\n        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len, 1) >>> 0;\n\n    const mem = getUint8ArrayMemory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;\n        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n        ptr = realloc(ptr, len, offset, 1) >>> 0;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachedDataViewMemory0 = null;\n\nfunction getDataViewMemory0() {\n    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {\n        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);\n    }\n    return cachedDataViewMemory0;\n}\n\nfunction _assertClass(instance, klass) {\n    if (!(instance instanceof klass)) {\n        throw new Error(`expected instance of ${klass.name}`);\n    }\n}\n/**\n * @param {string} expression\n * @param {Parser} parser\n * @returns {string}\n */\nfunction simplify(expression, parser) {\n    let deferred2_0;\n    let deferred2_1;\n    try {\n        const ptr0 = passStringToWasm0(expression, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n        const len0 = WASM_VECTOR_LEN;\n        _assertClass(parser, Parser);\n        const ret = wasm.simplify(ptr0, len0, parser.__wbg_ptr);\n        deferred2_0 = ret[0];\n        deferred2_1 = ret[1];\n        return getStringFromWasm0(ret[0], ret[1]);\n    } finally {\n        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);\n    }\n}\n\nconst ParserFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_parser_free(ptr >>> 0, 1));\n\nclass Parser {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Parser.prototype);\n        obj.__wbg_ptr = ptr;\n        ParserFinalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        ParserFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_parser_free(ptr, 0);\n    }\n    /**\n     * @returns {Parser}\n     */\n    static new() {\n        const ret = wasm.parser_new();\n        return Parser.__wrap(ret);\n    }\n    /**\n     * @param {string} name\n     * @param {string} expression\n     * @returns {string}\n     */\n    create_keyword(name, expression) {\n        let deferred3_0;\n        let deferred3_1;\n        try {\n            const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n            const len0 = WASM_VECTOR_LEN;\n            const ptr1 = passStringToWasm0(expression, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n            const len1 = WASM_VECTOR_LEN;\n            const ret = wasm.parser_create_keyword(this.__wbg_ptr, ptr0, len0, ptr1, len1);\n            deferred3_0 = ret[0];\n            deferred3_1 = ret[1];\n            return getStringFromWasm0(ret[0], ret[1]);\n        } finally {\n            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);\n        }\n    }\n    /**\n     * @param {string} name\n     */\n    remove_keyword(name) {\n        const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n        const len0 = WASM_VECTOR_LEN;\n        wasm.parser_remove_keyword(this.__wbg_ptr, ptr0, len0);\n    }\n}\n\nfunction __wbg_error_7534b8e9a36f1ab4(arg0, arg1) {\n    let deferred0_0;\n    let deferred0_1;\n    try {\n        deferred0_0 = arg0;\n        deferred0_1 = arg1;\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);\n    }\n};\n\nfunction __wbg_new_8a6f238a6ece86ea() {\n    const ret = new Error();\n    return ret;\n};\n\nfunction __wbg_stack_0ed75d68575b0f3c(arg0, arg1) {\n    const ret = arg1.stack;\n    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);\n    const len1 = WASM_VECTOR_LEN;\n    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);\n    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);\n};\n\nfunction __wbindgen_init_externref_table() {\n    const table = wasm.__wbindgen_export_3;\n    const offset = table.grow(4);\n    table.set(0, undefined);\n    table.set(offset + 0, undefined);\n    table.set(offset + 1, null);\n    table.set(offset + 2, true);\n    table.set(offset + 3, false);\n    ;\n};\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack://create-wasm-app/../pkg/lambda_calculator_bg.js?\n}");

/***/ }),

/***/ "../pkg/lambda_calculator_bg.wasm":
/*!****************************************!*\
  !*** ../pkg/lambda_calculator_bg.wasm ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("{/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./lambda_calculator_bg.js */ \"../pkg/lambda_calculator_bg.js\");\nmodule.exports = __webpack_require__.v(exports, module.id, \"51bf962f7d5e995fb5ef\", {\n\t\"./lambda_calculator_bg.js\": {\n\t\t\"__wbg_new_8a6f238a6ece86ea\": WEBPACK_IMPORTED_MODULE_0.__wbg_new_8a6f238a6ece86ea,\n\t\t\"__wbg_stack_0ed75d68575b0f3c\": WEBPACK_IMPORTED_MODULE_0.__wbg_stack_0ed75d68575b0f3c,\n\t\t\"__wbg_error_7534b8e9a36f1ab4\": WEBPACK_IMPORTED_MODULE_0.__wbg_error_7534b8e9a36f1ab4,\n\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw,\n\t\t\"__wbindgen_init_externref_table\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_init_externref_table\n\t}\n});\n\n//# sourceURL=webpack://create-wasm-app/../pkg/lambda_calculator_bg.wasm?\n}");

/***/ }),

/***/ "./modules/tabled.js":
/*!***************************!*\
  !*** ./modules/tabled.js ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   add_table_row: () => (/* binding */ add_table_row)\n/* harmony export */ });\n/* harmony import */ var lambda_calc_tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lambda-calc-tool */ \"../pkg/lambda_calculator.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([lambda_calc_tool__WEBPACK_IMPORTED_MODULE_0__]);\nlambda_calc_tool__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n// -- Imports -- /\n\n\n\n// -- Exports -- //\n\n/**\n * @param {string} name\n * @param {string} expression\n * @param {Parser} parser\n */\nconst add_table_row = (name, expression, parser) => {\n\tconst named_row = get_named_row(name, parser);\n\tnamed_row.cells[1].textContent = expression;\n}\n\n// -- Impls -- //\n\n/** @type {HTMLTableSectionElement} */\nconst tbody = document.getElementById(\"table-body\");\n\n/**\n * @param {string} name\n * @param {Parser} parser\n * @return {HTMLTableRowElement}x\n */\nconst get_named_row = (name, parser) => {\n\tfor (let i = 0; i < tbody.rows.length; ++i) {\n\t\tif (tbody.rows[i].cells[0].textContent === name) {\n\t\t\treturn tbody.rows[i];\n\t\t}\n\t}\n\n\tconst named_row = tbody.insertRow();\n\tconst del_button = document.createElement(\"button\");\n\tdel_button.type = \"button\";\n\tdel_button.className = \"button-delete-shorthand\";\n\tdel_button.textContent = \"–\";\n\tdel_button.title = \"Remove Shorthand\";\n\tdel_button.addEventListener(\"click\", (_) => {\n\t\tparser.remove_keyword(named_row.cells[0].textContent);\n\t\tnamed_row.remove();\n\t});\n\n\tnamed_row.insertCell(0).textContent = name;\n\tnamed_row.insertCell(1);\n\tnamed_row.insertCell(2).appendChild(del_button);\n\n\treturn named_row;\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://create-wasm-app/./modules/tabled.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var hasSymbol = typeof Symbol === "function";
/******/ 		var webpackQueues = hasSymbol ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = hasSymbol ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = hasSymbol ? Symbol("webpack error") : "__webpack_error__";
/******/ 		
/******/ 		
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 		
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 		
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			var handle = (deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 		
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}
/******/ 			var done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 			body(handle, done);
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm loading */
/******/ 	(() => {
/******/ 		__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 		
/******/ 			var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 			var fallback = () => (req
/******/ 				.then((x) => (x.arrayBuffer()))
/******/ 				.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 				.then((res) => (Object.assign(exports, res.instance.exports))));
/******/ 			return req.then((res) => {
/******/ 				if (typeof WebAssembly.instantiateStreaming === "function") {
/******/ 		
/******/ 					return WebAssembly.instantiateStreaming(res, importsObj)
/******/ 						.then(
/******/ 							(res) => (Object.assign(exports, res.instance.exports)),
/******/ 							(e) => {
/******/ 								if(res.headers.get("Content-Type") !== "application/wasm") {
/******/ 									console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
/******/ 									return fallback();
/******/ 								}
/******/ 								throw e;
/******/ 							}
/******/ 						);
/******/ 				}
/******/ 				return fallback();
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./modules/tabled.js");
/******/ 	
/******/ })()
;