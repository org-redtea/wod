import {Wod, RawMessage, OutcomingMessage, Prog} from "./types";

export const $global =
	(typeof self === 'object' && self.self === self && self) ||
  	(typeof global === 'object' && global.global === global && global) ||
  	   this;

export function useThread(thread: Wod) {
	return function wrappedWithThread(target: Prog) {
		return function(...args: any[]): void {
			return thread.exec(target, args);
		};
	};
}

export function hasWorker(): boolean {
	return 'Worker' in $global;
}

export function encodeMessage(data: RawMessage): OutcomingMessage {
  const result = {
    prog: data.prog.toString(),
    args: data.args
  };

  return result;
}

export function decodeMessage(data: OutcomingMessage): RawMessage {
  const result = {
    args: data.args
  } as RawMessage;

  result.prog = eval(`result.prog = ${data.prog}`);

  return result;
}

// http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string

const URL = $global.URL || $global.webkitURL;

export function createWorkerWithContent(content: string): Worker {
  try {
    try {
      let blob;

      try {
        // BlobBuilder = Deprecated, but widely implemented
        const BlobBuilder = $global.BlobBuilder ||
        $global.WebKitBlobBuilder ||
        $global.MozBlobBuilder ||
        $global.MSBlobBuilder;

        blob = new BlobBuilder();

        blob.append(content);

        blob = blob.getBlob();
      } catch (e) {
        // The proposed API
        blob = new Blob([content]);
      }

      return new Worker(URL.createObjectURL(blob));
    } catch (e) {
      return new Worker('data:application/javascript,' + encodeURIComponent(content));
    }
  } catch (e) {
    throw new Error('Inline worker is not supported');
  }
};
