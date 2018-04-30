import {hasWorker, createWorkerWithContent, encodeMessage, decodeMessage} from './utils';
import {Callback, EventRecord, Prog, Wod as WodInterface} from "./types";


const workerCode = `
${decodeMessage.toString()};

self.onmessage = function(event) {
  var decoded = decodeMessage(event.data);
  var prog = decoded.prog;
  var args = decoded.args;
  
  prog.apply(self, args);
}
`;

export class Wod implements WodInterface {
  static isPlatformSupportWorker: boolean = hasWorker();
  static spawn(): WodInterface { return new Wod(); }

  private $thread: Worker | void | null;
  private listeningThread: boolean;
  private readonly listeners: EventRecord[];
  private readonly onmessageListener: (event: MessageEvent) => void;
  private readonly onerrorListener: (event: ErrorEvent) => void;


  constructor() {
    if (!Wod.isPlatformSupportWorker)
      throw new Error('WebWorker is not supported');

    this.$thread = null;
    this.listeningThread = false;
    this.listeners = [];
    this.onmessageListener = (event: MessageEvent) => {
      this.emit('message', event);
    };
    this.onerrorListener = (event: ErrorEvent) => {
      this.emit('error', event);
    };

    const createdThread = createWorkerWithContent(workerCode);

    this.$thread = createdThread;

    this.listenThread();
  }

  on(event: string, callback: Callback): void {
    this.listeners.push([event, callback]);
  }

  off(event: string, callback: Callback) {
    const matchFn =
      (record: EventRecord): boolean =>
        record[0] === event &&
          record[1] === callback;

    const foundIndex = this.listeners.findIndex(matchFn);

    if (foundIndex !== -1) {
      this.listeners.splice(foundIndex, 1);
    }
  }

  emit(event: string, args?: any[] | any): void {
    const evLn = this.listeners.length;

    args = Array.isArray(args) ? args : [args];

    for (let i = 0; i < evLn; i++) {
      const record = this.listeners[i];

      if (record[0] === event) {
        record[1](...args);
      }
    }
  }

  listenThread(): void {
    if (this.listeningThread) return;
    if (!Wod.isPlatformSupportWorker) return;

    const thread = this.$thread as Worker;

    thread.onmessage = this.onmessageListener;
    thread.onerror = this.onerrorListener;

    this.listeningThread = true;
  }

  unlistenThread(): void {
    if (!this.listeningThread) return;
    if (!Wod.isPlatformSupportWorker) return;

    const thread = this.$thread as Worker;

    thread.onmessage = null;
    thread.onerror = null;

    this.listeningThread = false;
  }

  exec(prog: Prog, args?: any[]): void {
    if (!Wod.isPlatformSupportWorker) return;

    const thread = this.$thread as Worker;

    thread.postMessage(encodeMessage({prog, args}));
  }

  terminate(): void {
    const thread = this.$thread as Worker;

    this.unlistenThread();
    this.listeners.length = 0;

    thread.terminate();

    this.$thread = null;
  }
}
