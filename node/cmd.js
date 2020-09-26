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
exports.runCmd = void 0;
const goplayground_1 = require("@syumai/goplayground");
const fs_1 = __importDefault(require("fs"));
function loadData(filePath) {
    return fs_1.default.readFileSync(filePath, "utf-8");
}
function runCmd() {
    return __awaiter(this, void 0, void 0, function* () {
        const gp = new goplayground_1.GoPlayground(goplayground_1.defaultGoPlaygroundHostName);
        if (process.argv.length < 4) {
            console.error("arguments must be given");
            return;
        }
        const cmd = process.argv[2];
        const arg = process.argv[3];
        switch (cmd) {
            case "run": {
                const filePath = arg;
                const result = yield gp.compile(loadData(filePath));
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
                const filePath = arg;
                const result = yield gp.format(loadData(filePath));
                if (result.Error !== "") {
                    process.stderr.write(result.Error);
                    break;
                }
                process.stdout.write(result.Body);
                break;
            }
            case "share": {
                const filePath = arg;
                const result = yield gp.share(loadData(filePath));
                console.log(`https://play.golang.org/p/${result}`);
                break;
            }
            case "download": {
                const result = yield gp.download(arg);
                console.log(`https://play.golang.org/p/${result}`);
                break;
            }
        }
    });
}
exports.runCmd = runCmd;
//# sourceMappingURL=cmd.js.map