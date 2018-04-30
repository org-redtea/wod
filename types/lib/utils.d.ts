import { Wod, RawMessage, OutcomingMessage, Prog } from "./types";
export declare const $global: any;
export declare function useThread(thread: Wod): (target: Prog) => (...args: any[]) => void;
export declare function hasWorker(): boolean;
export declare function encodeMessage(data: RawMessage): OutcomingMessage;
export declare function decodeMessage(data: OutcomingMessage): RawMessage;
export declare function createWorkerWithContent(content: string): Worker;
