#!/usr/bin/env node

export * from "@syumai/goplayground";
import fetch from "node-fetch";
import FormData from "form-data";
import { runCmd } from "./cmd";

// Apply polyfills
// @ts-ignore
globalThis.fetch = fetch;
// @ts-ignore
globalThis.FormData = FormData;

if (module === require.main) {
  runCmd();
}
