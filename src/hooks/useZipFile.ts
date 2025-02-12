import { useState } from 'react';
import JSZip, { OutputType } from 'jszip';

function useZipFile() {
  const [zipFile] = useState<JSZip>(new JSZip());

  function addZipFile(path: string, content: string) {
    zipFile.file(path, content);
  }

  function addZipFolder(folder: string) {
    zipFile.folder(folder);
  }

  function generateZip(zipName: string) {
    zipFile.generateAsync({ type: 'blob' }).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = zipName;
      a.click();

      window.URL.revokeObjectURL(url);
    });
  }

  function getZipFile(
    path: string,
    type: OutputType = 'string',
    callback: (content: any) => void
  ) {
    zipFile.file(path)?.async(type).then(callback);
  }

  function removeZipEntry(path: string) {
    zipFile.remove(path);
  }

  return {
    zipFile,
    addZipFile,
    addZipFolder,
    generateZip,
    getZipFile,
    removeZipEntry,
  };
}

// Export
export default useZipFile;
