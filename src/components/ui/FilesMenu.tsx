// Import dependencies
import { Button, HStack, Tooltip } from '@chakra-ui/react';
import {
  LuFilePlus,
  LuTrash2,
  LuFolderPlus,
  LuHardDriveUpload,
} from 'react-icons/lu';
// Import store
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import useAppTheme from '@/themes/useAppTheme';
import useModalStore from '@/stores/useModalStore';
// Import types
import { EModalTypes } from '@/types';

// Constants
const ICON_SIZE = 20;

// Files menu item component
function FilesMenuItem({
  children,
  label,
  onClick,
  isLoading = false,
  disabled = false,
}) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <Tooltip label={label} placement="top" hasArrow>
      <Button
        p={0}
        h="auto"
        minW="auto"
        bg="transparent"
        color={colorAlt}
        _hover={{
          bg: 'transparent',
          color: disabled ? '' : color,
          transform: disabled ? '' : 'scale(1.2)',
        }}
        _active={{ bg: 'transparent', color: color }}
        onClick={onClick}
        isLoading={isLoading}
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

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
        <FilesMenuItem
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
          <LuFilePlus size={ICON_SIZE} />
        </FilesMenuItem>

        {/* TODO - Add folder support */}
        <FilesMenuItem
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
          <LuFolderPlus size={ICON_SIZE} />
        </FilesMenuItem>

        <FilesMenuItem
          label="Upload file"
          onClick={() => {
            if (!currentFolder) {
              setCurrentFolder(`/workspaces/${currentWorkspace}`);
            }

            setModalType(EModalTypes.UPLOAD_FILE);
            onOpen();
          }}
        >
          <LuHardDriveUpload size={ICON_SIZE} />
        </FilesMenuItem>
      </HStack>

      <FilesMenuItem
        label="Delete all files"
        onClick={() => {
          setModalType(EModalTypes.DELETE_ALL_FILES);
          onOpen();
        }}
        disabled={files.length < 1}
      >
        <LuTrash2 size={ICON_SIZE} />
      </FilesMenuItem>
    </HStack>
  );
}

// Export
export default FilesMenu;
