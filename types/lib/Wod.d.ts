import { Callback, Prog, Wod as WodInterface } from "./types";
export declare class Wod implements WodInterface {
    static isPlatformSupportWorker: boolean;
    static spawn(): WodInterface;
    private $thread;
    private listeningThread;
    private readonly listeners;
    private readonly onmessageListener;
    private readonly onerrorListener;
    constructor();
    on(event: string, callback: Callback): void;
    off(event: string, callback: Callback): void;
    emit(event: string, args?: any[] | any): void;
    listenThread(): void;
    unlistenThread(): void;
    exec(prog: Prog, args?: any[]): void;
    terminate(): void;
}
