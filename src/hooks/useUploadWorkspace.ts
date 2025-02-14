// import minima from '@/lib/minima';
import minima from '@/lib/minima';
import useWorkspaceStore from '@/store/useWorkspaceStore';
import isImageFile from '@/utils/isImageFile';
import isTextFile from '@/utils/isTextFile';
import JSZip from 'jszip';
import { useState } from 'react';

function useUploadWorkspace() {
  // Define store
  const setCurrentWorkspace = useWorkspaceStore(
    (state) => state.setCurrentWorkspace
  );
  const refreshWorkspaces = useWorkspaceStore(
    (state) => state.refreshWorkspaces
  );

  // Define states
  const [fileContents, setFileContents] = useState({});
  const [error, setError]: [any, any] = useState(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Define handlers
  async function handleUploadWorkspace(file: any, workspace: string) {
    if (file) {
      try {
        setIsUploading(true);
        setProgress(null);
        setError(null);

        const zip = new JSZip();
        const content = await zip.loadAsync(file);
        const newFileContents = {};

        for (const filename in content.files) {
          const zipEntry = content.files[filename];

          // Check if it's a file (not a directory)
          if (!zipEntry.dir) {
            try {
              let fileContent: string | ArrayBuffer;

              // Check if it's a text, image, or other file
              if (isTextFile(filename)) {
                fileContent = await zipEntry.async('string');
              } else if (isImageFile(filename)) {
                fileContent = await zipEntry.async('base64');
              } else {
                fileContent = await zipEntry.async('arraybuffer');
              }

              newFileContents[filename] = fileContent;

              setProgress(
                Object.keys(newFileContents).length /
                  Object.keys(content.files).length
              );
            } catch (error: any) {
              console.error(`Error reading file ${filename}:`, error);
              newFileContents[
                filename
              ] = `Error reading file: ${error.message}`; // Or handle differently
            }
          }
        }

        setFileContents(newFileContents);

        const entryFiles = Object.entries(newFileContents);
        entryFiles.forEach(async (entry) => {
          const [fileName, fileContent] = entry;
          // console.log(fileName, fileContent);

          if (isImageFile(fileName)) {
            const binary = minima.util.base64ToHex(fileContent);

            await minima.file.savebinary(
              `workspaces/${workspace}/${fileName}`,
              binary
            );
          } else {
            await minima.file.save(
              `workspaces/${workspace}/${fileName}`,
              fileContent
            );
          }
        });

        setCurrentWorkspace(workspace);
        refreshWorkspaces();
        setIsUploading(false);
      } catch (err: any) {
        console.error('Error loading zip file:', err);
        setIsUploading(false);
        setError(
          err.message ? err.message : err ? err : 'Error loading zip file'
        );
      }
    }
  }

  return {
    error,
    progress,
    isUploading,
    handleUploadWorkspace,

    fileContents,
  };
}

export default useUploadWorkspace;
