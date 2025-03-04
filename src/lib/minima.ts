// Import types
import { IResponse, IWindow } from '@/types';
// Import utilities
import responseHandler from '../utils/responseHandler';

// Define MiniDapp System (MDS)
export const mds = (window as IWindow & typeof globalThis).MDS;

// Define MDS wrapper
const minima = {
  version: '0.0.1',

  cmd: function <T>(command: string): Promise<IResponse<T>> {
    return new Promise((resolve, reject) => {
      mds.cmd<T>(command, (msg) => {
        responseHandler<T>(
          msg,
          resolve,
          reject,
          'Failed to run command: ' + command
        );
      });
    });
  },

  file: {
    list: function (path: string) {
      return new Promise((resolve, reject) => {
        mds.file.list(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to retrieve file or directory: ' + path
          );
        });
      });
    },
    save: function (path: string, data: string) {
      return new Promise((resolve, reject) => {
        mds.file.save(path, data, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to save file: ' + path);
        });
      });
    },
    savebinary: function (path: string, hexdata: string) {
      return new Promise((resolve, reject) => {
        mds.file.savebinary(path, hexdata, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to save file: ' + path);
        });
      });
    },
    load: function <T>(path: string): Promise<IResponse<T>> {
      return new Promise((resolve, reject) => {
        mds.file.load<T>(path, (msg) => {
          responseHandler<T>(
            msg,
            resolve,
            reject,
            'Failed to load file: ' + path
          );
        });
      });
    },
    loadbinary: function (path: string) {
      return new Promise((resolve, reject) => {
        mds.file.loadbinary(path, (msg) => {
          responseHandler(msg, resolve, reject, 'Failed to load file: ' + path);
        });
      });
    },
    delete: function (path: string) {
      return new Promise((resolve, reject) => {
        mds.file.delete(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to delete file: ' + path
          );
        });
      });
    },
    getpath: function (path: string) {
      return new Promise((resolve, reject) => {
        mds.file.getpath(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to get file path: ' + path
          );
        });
      });
    },
    makedir: function (path: string) {
      return new Promise((resolve, reject) => {
        mds.file.makedir(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to make directory: ' + path
          );
        });
      });
    },
    copy: function (path: string, newPath: string) {
      return new Promise((resolve, reject) => {
        mds.file.copy(path, newPath, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to copy file: ' + path + ' to ' + newPath
          );
        });
      });
    },
    move: function (path: string, newPath: string) {
      return new Promise((resolve, reject) => {
        mds.file.move(path, newPath, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to move file: ' + path + ' to ' + newPath
          );
        });
      });
    },
    copytoweb: function (path: string, newPath: string) {
      return new Promise((resolve, reject) => {
        mds.file.copytoweb(path, newPath, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to copy file to web folder: ' + path + ' to ' + newPath
          );
        });
      });
    },
    deletefromweb: function (path: string) {
      return new Promise((resolve, reject) => {
        mds.file.deletefromweb(path, (msg) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to delete file from web folder: ' + path
          );
        });
      });
    },
  },

  util: {
    hexToBase64: function (hex: string) {
      return mds.util.hexToBase64(hex);
    },
    base64ToHex: function (str: string) {
      return mds.util.base64ToHex(str);
    },
  },
};

export default minima;
