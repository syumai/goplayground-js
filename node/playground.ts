import fetch from "node-fetch";
import FormData from "form-data";
export * from "@syumai/goplayground-js";

// Apply polyfills
// @ts-ignore
globalThis.fetch = fetch;
// @ts-ignore
globalThis.FormData = FormData;