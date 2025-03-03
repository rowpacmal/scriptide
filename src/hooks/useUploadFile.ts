import minima, { mds } from '@/lib/minima';
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

function useUploadFile(fileInput: any) {
  // Define toast
  const toast = useToast();

  // Define store
  const files = useFileStore((state) => state.files);
  const refreshFiles = useFileStore((state) => state.refreshFiles);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define states
  const [, setFile] = useState(undefined);
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Define functions
  function onError(err: any) {
    console.error(err);
    toast({
      title: 'Error uploading file',
      description: err,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });

    setIsError(true);
    setIsUploading(false);
    refreshFiles(currentWorkspace as string, false);
  }

  // Define handlers
  async function handleUploadFile(file: any, newName?: string) {
    try {
      if (!newName?.includes('.') || newName.endsWith('.')) {
        onError('File name must include extension');
        return;
      }
      if (file.size === 0) {
        onError('File content cannot be empty');
        return;
      }

      const fileLocation = `${currentFolder}/${newName || file.name}`;
      for (const f of files) {
        if (f.location === fileLocation) {
          onError('File already exists');
          return;
        }
      }

      setFile(file);
      if (file) {
        setProgress(null);
        setIsUploading(true);
        setIsError(false);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mds.file.upload(file, async function (resp) {
          if (resp.allchunks >= 10) {
            setProgress(resp.chunk / resp.allchunks);
          }

          if (resp.allchunks === resp.chunk) {
            setFile(undefined);
            setProgress(1);
            setIsUploading(false);

            await minima.file.move(`/fileupload/${file.name}`, fileLocation);
            refreshFiles(currentWorkspace as string, false);

            if (fileInput.current) {
              (fileInput.current as any).value = null;
            }
          }
        });
      }
    } catch (err: any) {
      onError(err);
    }
  }

  return {
    progress,
    isUploading,
    isError,
    handleUploadFile,
  };
}

export default useUploadFile;
