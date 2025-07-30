import * as wasm from "./lambda_calculator_bg.wasm";
export * from "./lambda_calculator_bg.js";
import { __wbg_set_wasm } from "./lambda_calculator_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
