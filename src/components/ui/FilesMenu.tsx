// Import dependencies
import { HStack } from '@chakra-ui/react';
// Import icons
import {
  LuFilePlus,
  LuTrash2,
  LuFolderPlus,
  LuHardDriveUpload,
} from 'react-icons/lu';
// Import store
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useModalStore from '@/stores/useModalStore';
// Import types
import { EModalTypes } from '@/types';
// Import constants
import { ICON_SIZES } from '@/constants';
// Import components
import HoverButton from './systems/HoverButton';

// Files menu component
function FilesMenu() {
  // Define store
  const files = useFileStore((state) => state.files);
  const isAddingFile = useFileStore((state) => state.isAddingFile);
  const setIsAddingFile = useFileStore((state) => state.setIsAddingFile);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const setIsFolder = useFileStore((state) => state.setIsFolder);
  const setModalType = useModalStore((state) => state.setModalType);
  const onOpen = useModalStore((state) => state.onOpen);

  // Render
  return (
    <HStack w="100%" px={1} justify="space-between" gap={1}>
      <HStack gap={1}>
        <HoverButton
          label="Create new file"
          onClick={() => {
            if (!isAddingFile) {
              setIsFolder(false);
              setIsAddingFile(true);
            }

            if (!currentFolder) {
              setCurrentFolder(`/workspaces/${currentWorkspace}`);
            }
          }}
        >
          <LuFilePlus size={ICON_SIZES.sm} />
        </HoverButton>

        <HoverButton
          label="Create new folder"
          onClick={() => {
            if (!isAddingFile) {
              setIsFolder(true);
              setIsAddingFile(true);
            }

            if (!currentFolder) {
              setCurrentFolder(`/workspaces/${currentWorkspace}`);
            }
          }}
        >
          <LuFolderPlus size={ICON_SIZES.sm} />
        </HoverButton>

        <HoverButton
          label="Upload file"
          onClick={() => {
            if (!currentFolder) {
              setCurrentFolder(`/workspaces/${currentWorkspace}`);
            }

            setModalType(EModalTypes.UPLOAD_FILE);
            onOpen();
          }}
        >
          <LuHardDriveUpload size={ICON_SIZES.sm} />
        </HoverButton>
      </HStack>

      <HoverButton
        label="Delete all files"
        onClick={() => {
          setModalType(EModalTypes.DELETE_ALL_FILES);
          onOpen();
        }}
        disabled={files.length < 1}
      >
        <LuTrash2 size={ICON_SIZES.sm} />
      </HoverButton>
    </HStack>
  );
}

// Export
export default FilesMenu;
