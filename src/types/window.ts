import { TMessage } from './response';

interface IWindow extends Window {
  DEBUG: string;
  DEBUG_HOST: string;
  DEBUG_MINIDAPPID: string;
  DEBUG_PORT: string;
  DEBUG_UID: string;

  MDS: {
    cmd: <T>(command: string, callback: (msg: TMessage<T>) => void) => void;
    file: {
      list: <T>(path: string, callback: (msg: TMessage<T>) => void) => void;
      save: <T>(
        path: string,
        data: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      savebinary: <T>(
        path: string,
        data: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      load: <T>(path: string, callback: (msg: TMessage<T>) => void) => void;
      loadbinary: <T>(
        path: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      delete: <T>(path: string, callback: (msg: TMessage<T>) => void) => void;
      getpath: <T>(path: string, callback: (msg: TMessage<T>) => void) => void;
      makedir: <T>(path: string, callback: (msg: TMessage<T>) => void) => void;
      copy: <T>(
        path: string,
        newPath: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      move: <T>(
        path: string,
        newPath: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      upload: <T>(
        path: string,
        data: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      copytoweb: <T>(
        path: string,
        newPath: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
      deletefromweb: <T>(
        path: string,
        callback: (msg: TMessage<T>) => void
      ) => void;
    };
    filehost: string;
    init: (callback: (msg: TMessage<unknown>) => void) => void;
    util: {
      hexToBase64: (hex: string) => string;
      base64ToHex: (base64: string) => string;
    };
  };
}

export type { IWindow };
