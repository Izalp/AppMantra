import '@testing-library/jest-dom';

if (typeof TextDecoder === 'undefined') {
    const { TextDecoder, TextEncoder, ReadableStream} = require("node:util");
    Object.defineProperties(globalThis, {
      TextDecoder: { value: TextDecoder },
      TextEncoder: { value: TextEncoder },
      ReadableStream: { value: ReadableStream },
    });
  }
  
  if (typeof fetch === 'undefined') {
    const { fetch, Headers, FormData, Request, Response } = require("undici");
    const { Blob, File } = require("node:buffer");
    Object.defineProperties(globalThis, {
      fetch: { value: fetch, writable: true },
      Blob: { value: Blob },
      File: { value: File },
      Headers: { value: Headers },
      FormData: { value: FormData },
      Request: { value: Request },
      Response: { value: Response },
    });
  }
  
  global.setImmediate = global.setImmediate || ((fn: (...args: any[]) => void, ...args: any) => setTimeout(fn, 0, ...args));
  global.clearImmediate = global.clearImmediate || (() => {});
