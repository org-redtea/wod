export declare type EventRecord = [string, (...args: any[]) => any];
export declare type Prog = (...args: any[]) => any;
export declare type Callback = (...args: any[]) => void;
export declare type OutcomingMessage = {
    prog: string;
    args: any[] | void;
};
export declare type RawMessage = {
    prog: Prog;
    args: any[] | void;
};
export interface Wod {
    on(event: string, callback: Callback): void;
    off(event: string, callback: Callback): void;
    emit(event: string, args?: any[] | any): void;
    exec(prog: Prog, args?: any[]): void;
    terminate(): void;
}
