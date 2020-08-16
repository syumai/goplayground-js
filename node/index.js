#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const goplayground_1 = require("@syumai/goplayground");
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
// Apply polyfills
// @ts-ignore
globalThis.fetch = node_fetch_1.default;
// @ts-ignore
globalThis.FormData = form_data_1.default;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const gp = new goplayground_1.GoPlayground(goplayground_1.defaultGoPlaygroundHostName);
    if (process.argv.length < 4) {
        console.error("arguments must be given");
        return;
    }
    const cmd = process.argv[2];
    const filePath = process.argv[3];
    const data = fs_1.default.readFileSync(filePath, "utf-8");
    switch (cmd) {
        case "run": {
            const result = yield gp.compile(data);
            if (result.Errors !== "") {
                process.stderr.write(result.Errors);
                break;
            }
            for (const event of result.Events) {
                switch (event.Kind) {
                    case "stdout":
                        process.stdout.write(event.Message);
                        break;
                    case "stderr":
                        process.stderr.write(event.Message);
                        break;
                }
            }
            break;
        }
        case "fmt": {
            const result = yield gp.format(data);
            if (result.Error !== "") {
                console.error(result.Error);
                break;
            }
            process.stdout.write(result.Body);
            break;
        }
        case "share": {
            const result = yield gp.share(data);
            console.log(`https://play.golang.org/p/${result}`);
            break;
        }
    }
}))();
//# sourceMappingURL=index.js.map