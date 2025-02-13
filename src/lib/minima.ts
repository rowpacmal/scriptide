import responseHandler from '../utils/responseHandler';

/* eslint-disable @typescript-eslint/no-explicit-any */
const minima: any = {
  version: '0.0.1',

  cmd: function (command: string) {
    return new Promise((resolve, reject) => {
      (window as any).MDS.cmd(command, (msg: any) => {
        responseHandler(
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
        (window as any).MDS.file.list(path, (msg: any) => {
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
        (window as any).MDS.file.save(path, data, (msg: any) => {
          responseHandler(msg, resolve, reject, 'Failed to save file: ' + path);
        });
      });
    },
    load: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.load(path, (msg: any) => {
          responseHandler(msg, resolve, reject, 'Failed to load file: ' + path);
        });
      });
    },
    loadbinary: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.loadbinary(path, (msg: any) => {
          responseHandler(msg, resolve, reject, 'Failed to load file: ' + path);
        });
      });
    },
    delete: function (path: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.delete(path, (msg: any) => {
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
        (window as any).MDS.file.getpath(path, (msg: any) => {
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
        (window as any).MDS.file.makedir(path, (msg: any) => {
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
        (window as any).MDS.file.copy(path, newPath, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to copy file: ' + path + ' to ' + newPath
          );
        });
      });
    },
    move: function (oldPath: string, newPath: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.move(oldPath, newPath, (msg: any) => {
          responseHandler(
            msg,
            resolve,
            reject,
            'Failed to move file: ' + oldPath + ' to ' + newPath
          );
        });
      });
    },
    copytoweb: function (path: string, newPath: string) {
      return new Promise((resolve, reject) => {
        (window as any).MDS.file.copytoweb(path, newPath, (msg: any) => {
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
        (window as any).MDS.file.deletefromweb(path, (msg: any) => {
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
      return (window as any).MDS.util.hexToBase64(hex);
    },
  },
};

export default minima;
