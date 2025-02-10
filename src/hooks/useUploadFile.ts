import minima from '@/lib/minima';
import useFileStore from '@/store/useFileStore';
import { useState } from 'react';

function useUploadFile(fileInput: any) {
  // Define store
  const files = useFileStore((state) => state.files);
  const refreshFiles = useFileStore((state) => state.refreshFiles);

  // Define states
  const [, setFile] = useState(undefined);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Define functions
  function onError(err: any, workspace: string) {
    // console.error(err);
    setError(err);
    setIsUploading(false);
    refreshFiles(workspace);
  }

  // Define handlers
  async function handleUploadFile(file: any, workspace: string) {
    try {
      setFile(file);

      if (file) {
        setIsUploading(true);
        setProgress(null);
        setError(null);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        MDS.file.upload(file, async function (resp) {
          if (resp.allchunks >= 10) {
            setProgress(resp.chunk / resp.allchunks);
          }

          if (resp.allchunks === resp.chunk) {
            setFile(undefined);
            setIsUploading(false);

            if (files.includes(file.name)) {
              onError('File already exists', workspace);
              return;
            }

            await minima.file.move(
              `/fileupload/${file.name}`,
              `workspaces/${workspace}/${file.name}`
            );
            refreshFiles(workspace);

            if (fileInput.current) {
              (fileInput.current as any).value = null;
            }
          }
        });
      }
    } catch (err: any) {
      onError(err, workspace);
    }
  }

  return {
    error,
    progress,
    isUploading,
    handleUploadFile,
  };
}

export default useUploadFile;
