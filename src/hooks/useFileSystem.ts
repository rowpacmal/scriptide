/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { useContext } from 'react';
// Import context
import { appContext } from '../AppContext';
import useTryCatch from './useTryCatch';
import minima from '../libs/minima';
import getFiles from '../utils/getFiles';

// File system hook
function useFileSystem() {
  // Define trycatch
  const tryCatch = useTryCatch();

  // Define context
  const {
    files,
    setFiles,
    currentFile,
    setCurrentFile,

    workspaces,
    setWorkspaces,
    currentWorkspace,
    setCurrentWorkspace,

    code,
    setCode,
  } = useContext(appContext);

  // Define handlers
  // Files
  function handleNewFile(newFile: string) {
    tryCatch(async () => {
      const folder = `workspaces/${currentWorkspace}`;
      const file = `${newFile}.kvm`;
      await minima.file.save(`${folder}/${file}`, '');

      setFiles(await getFiles(folder));
      setCurrentFile(file);
      setCode('');
    });
  }

  function handleSaveFileData() {
    tryCatch(async () => {
      await minima.file.save(
        `workspaces/${currentWorkspace}/${currentFile}`,
        code
      );
    });
  }

  function handleLoadFileData(fileName: string) {
    tryCatch(async () => {
      const data = (
        await minima.file.load(`workspaces/${currentWorkspace}/${fileName}`)
      ).response.load.data;

      setCode(data);
    });
  }

  function handleDeleteFile(fileName: string) {
    tryCatch(async () => {
      await minima.file.delete(`workspaces/${currentWorkspace}/${fileName}`);

      if (fileName === currentFile) {
        setCurrentFile(null);
        setCode(null);
      }

      setFiles(await getFiles(`workspaces/${currentWorkspace}`));
    });
  }

  // Workspaces
  function handleRefreshWorkspaces() {
    tryCatch(async () => {
      const folders: any = await getFiles('workspaces');
      setWorkspaces(folders);

      const lastFolder = folders.at(-1);
      setCurrentWorkspace(lastFolder);

      const files: any = await getFiles(`workspaces/${lastFolder}`);
      setFiles(files);
    });
  }

  function handleNewWorkspace(newWorkspace: string) {
    tryCatch(async () => {
      await minima.file.makedir(`workspaces/${newWorkspace}`);

      setWorkspaces(await getFiles('workspaces'));
      setCurrentWorkspace(newWorkspace);
    });
  }

  function handleRenameWorkspace(newWorkspace: string) {
    tryCatch(async () => {
      const currentFolder = `workspaces/${currentWorkspace}`;
      const newFolder = `workspaces/${newWorkspace}`;
      const files: any = await getFiles(currentFolder);

      if (files.length > 0) {
        for (const file of files) {
          await minima.file.move(
            `${currentFolder}/${file}`,
            `${newFolder}/${file}`
          );
        }
      } else {
        await minima.file.makedir(newFolder);
      }

      /** Quick fix to a renaming bug, where you can rename a workspace
       * to the same name but in different case (lowercase or uppercase).
       */
      if (
        newWorkspace.toLocaleLowerCase() !==
        currentWorkspace.toLocaleLowerCase()
      ) {
        await minima.file.delete(currentFolder);
      }

      setWorkspaces(await getFiles('workspaces'));
      setCurrentWorkspace(newWorkspace);
    });
  }

  function handleCopyWorkspace(newWorkspace: string) {
    tryCatch(async () => {
      const currentFolder = `workspaces/${currentWorkspace}`;
      const newFolder = `workspaces/${newWorkspace}`;
      const files: any = await getFiles(currentFolder);

      if (files.length > 0) {
        for (const file of files) {
          await minima.file.copy(
            `${currentFolder}/${file}`,
            `${newFolder}/${file}`
          );
        }
      } else {
        await minima.file.makedir(newFolder);
      }

      setWorkspaces(await getFiles('workspaces'));
      setCurrentWorkspace(newWorkspace);
    });
  }

  function handleDeleteWorkspace() {
    tryCatch(async () => {
      await minima.file.delete(`workspaces/${currentWorkspace}`);

      const files: any = await getFiles('workspaces');

      setWorkspaces(files);
      setCurrentWorkspace(files.at(-1));

      setCurrentFile(null);
      setCode(null);
    });
  }

  function handleDeleteAllWorkspaces() {
    tryCatch(async () => {
      await minima.file.delete('workspaces');
      await minima.file.makedir('workspaces');

      // const files: any = await getFiles('workspaces');

      setWorkspaces([]);
      setCurrentWorkspace(null);

      setFiles([]); // Quick fix to a bug
      setCurrentFile(null);
      setCode(null);
    });
  }

  // Return file system
  return {
    handleNewFile,
    handleSaveFileData,
    handleLoadFileData,
    handleDeleteFile,

    handleRefreshWorkspaces,
    handleNewWorkspace,
    handleRenameWorkspace,
    handleCopyWorkspace,
    handleDeleteWorkspace,
    handleDeleteAllWorkspaces,
  };
}

// Export
export default useFileSystem;
