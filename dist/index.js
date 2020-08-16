"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoPlayground = exports.defaultGoPlaygroundHostName = void 0;
/**
 * client implementation
 */
exports.defaultGoPlaygroundHostName = "https://play.golang.org";
class GoPlayground {
    constructor(hostName = exports.defaultGoPlaygroundHostName) {
        this.hostName = hostName;
    }
    async compile(body, withVet = true) {
        const data = new FormData();
        data.append("version", "2");
        data.append("body", body);
        data.append("withVet", String(withVet));
        const res = await fetch(`${this.hostName}/compile`, generateRequestInit(this.hostName, data));
        return (await res.json());
    }
    async format(body, withImports = false) {
        const data = new FormData();
        data.append("body", body);
        data.append("imports", String(withImports));
        const res = await fetch(`${this.hostName}/fmt`, generateRequestInit(this.hostName, data));
        return (await res.json());
    }
    async share(body) {
        const res = await fetch(`${this.hostName}/share`, generateRequestInit(this.hostName, body));
        return await res.text();
    }
}
exports.GoPlayground = GoPlayground;
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