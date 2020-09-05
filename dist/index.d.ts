export interface GoPlaygroundAPIClient {
    compile(body: string, withVet: boolean): Promise<CompileResult>;
    format(body: string, withImports: boolean): Promise<FormatResult>;
    share(body: string): Promise<string>;
    download(key: string): Promise<string>;
}
/**
 * types for /compile
 */
export declare type CompileEventKind = "stdout" | "stderr";
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
export declare const defaultGoPlaygroundHostName = "https://play.golang.org";
export declare class GoPlayground implements GoPlaygroundAPIClient {
    private hostName;
    constructor(hostName?: string);
    compile(body: string, withVet?: boolean): Promise<CompileResult>;
    format(body: string, withImports?: boolean): Promise<FormatResult>;
    share(body: string): Promise<string>;
    download(key: string): Promise<string>;
}
