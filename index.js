var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * client implementation
 */
export const defaultGoPlaygroundHostName = "https://play.golang.org";
export class GoPlayground {
    constructor(hostName = defaultGoPlaygroundHostName) {
        this.hostName = hostName;
    }
    compile(body, withVet = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            data.append("version", "2");
            data.append("body", body);
            data.append("withVet", String(withVet));
            const res = yield fetch(`${this.hostName}/compile`, generateRequestInit(this.hostName, data));
            return (yield res.json());
        });
    }
    format(body, withImports = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new FormData();
            data.append("body", body);
            data.append("imports", String(withImports));
            const res = yield fetch(`${this.hostName}/fmt`, generateRequestInit(this.hostName, data));
            return (yield res.json());
        });
    }
    share(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.hostName}/share`, generateRequestInit(this.hostName, body));
            return yield res.text();
        });
    }
    download(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${this.hostName}/p/${key}.go`, {
                referrer: this.hostName,
                referrerPolicy: "no-referrer-when-downgrade",
                method: "GET",
                mode: "cors",
            });
            return yield res.text();
        });
    }
}
function generateRequestInit(referrer, body) {
    return {
        headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
        },
        referrer,
        referrerPolicy: "no-referrer-when-downgrade",
        body,
        method: "POST",
        mode: "cors",
    };
}
//# sourceMappingURL=index.js.map