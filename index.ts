export interface GoPlaygroundAPIClient {
  compile(body: string, withVet: boolean): Promise<CompileResult>;
  format(body: string, withImports: boolean): Promise<FormatResult>;
  share(body: string): Promise<string>;
}

/**
 * types for /compile
 */

export type CompileEventKind = "stdout" | "stderr";

export interface CompileEvent {
  Message: string;
  Kind: CompileEventKind;
  Delay: number;
}

export interface CompileResult {
  Errors: string;
  Events: CompileEvent[];
  Status: number;
  IsTest: boolean;
  TestsFailed: number;
  VetOK: boolean;
}

/**
 * types for /format
 */

export interface FormatResult {
  Body: string;
  Error: string;
}

/**
 * client implementation
 */

export const defaultGoPlaygroundHostName = "https://play.golang.org";

export class GoPlayground implements GoPlaygroundAPIClient {
  constructor(private hostName: string = defaultGoPlaygroundHostName) {}

  async compile(body: string, withVet: boolean = true): Promise<CompileResult> {
    const data = new FormData();
    data.append("version", "2");
    data.append("body", body);
    data.append("withVet", String(withVet));

    const res = await fetch(
      `${this.hostName}/compile`,
      generateRequestInit(this.hostName, data)
    );
    return (await res.json()) as CompileResult;
  }

  async format(
    body: string,
    withImports: boolean = false
  ): Promise<FormatResult> {
    const data = new FormData();
    data.append("body", body);
    data.append("imports", String(withImports));

    const res = await fetch(
      `${this.hostName}/fmt`,
      generateRequestInit(this.hostName, data)
    );
    return (await res.json()) as FormatResult;
  }

  async share(body: string): Promise<string> {
    const res = await fetch(
      `${this.hostName}/share`,
      generateRequestInit(this.hostName, body)
    );
    return await res.text();
  }
}

function generateRequestInit(
  referrer: string,
  body: FormData | string
): RequestInit {
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
