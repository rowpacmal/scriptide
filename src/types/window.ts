import { TMessage } from './response';

interface IWindow extends Window {
  MDS: {
    cmd<T>(command: string, callback: (msg: T) => void): void;
    file: {
      list: (path: string, callback: (msg: TMessage) => void) => void;
      save: (
        path: string,
        data: string,
        callback: (msg: TMessage) => void
      ) => void;
      savebinary: (
        path: string,
        data: string,
        callback: (msg: TMessage) => void
      ) => void;
      load: (path: string, callback: (msg: TMessage) => void) => void;
      loadbinary: (path: string, callback: (msg: TMessage) => void) => void;
      delete: (path: string, callback: (msg: TMessage) => void) => void;
      getpath: (path: string, callback: (msg: TMessage) => void) => void;
      makedir: (path: string, callback: (msg: TMessage) => void) => void;
      copy: (
        path: string,
        newPath: string,
        callback: (msg: TMessage) => void
      ) => void;
      move: (
        path: string,
        newPath: string,
        callback: (msg: TMessage) => void
      ) => void;
      upload: (
        path: string,
        data: string,
        callback: (msg: TMessage) => void
      ) => void;
      copytoweb: (
        path: string,
        newPath: string,
        callback: (msg: TMessage) => void
      ) => void;
      deletefromweb: (path: string, callback: (msg: TMessage) => void) => void;
    };
    filehost: string;
    init: (callback: (msg: TMessage) => void) => void;
    util: {
      hexToBase64: (hex: string) => string;
      base64ToHex: (base64: string) => string;
    };
  };
  DEBUG_MINIDAPPID: string;
}

export type { IWindow };
