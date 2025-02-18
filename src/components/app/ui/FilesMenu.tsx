// Import dependencies
import {
  Button,
  HStack,
  Modal,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import {
  LuFilePlus,
  LuTrash2,
  LuFolderPlus,
  LuHardDriveUpload,
} from 'react-icons/lu';
// Import store
import useFileStore from '@/store/useFileStore';
import FilesDeleteAll from './FilesDeleteAll';
import { useState } from 'react';
import FilesUpload from './FilesUpload';
import useWorkspaceStore from '@/store/useWorkspaceStore';

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
  // Render
  return (
    <Tooltip label={label} placement="top" hasArrow>
      <Button
        p={0}
        h="auto"
        minW="auto"
        bg="transparent"
        color="gray.500"
        _hover={{
          bg: 'transparent',
          color: disabled ? '' : 'gray.50',
          transform: disabled ? '' : 'scale(1.2)',
        }}
        _active={{ bg: 'transparent', color: 'gray.50' }}
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
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define store
  const files = useFileStore((state) => state.files);
  const isAddingFile = useFileStore((state) => state.isAddingFile);
  const setIsAddingFile = useFileStore((state) => state.setIsAddingFile);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const setIsFolder = useFileStore((state) => state.setIsFolder);

  // Define state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modalType, setModalType]: [string | null, any] = useState(null);

  // Render
  return (
    <>
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
              setModalType('upload');
              onOpen();
            }}
          >
            <LuHardDriveUpload size={ICON_SIZE} />
          </FilesMenuItem>
        </HStack>

        <FilesMenuItem
          label="Delete all files"
          onClick={() => {
            setModalType('delete-all');
            onOpen();
          }}
          disabled={files.length < 1}
        >
          <LuTrash2 size={ICON_SIZE} />
        </FilesMenuItem>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        {modalType === 'upload' && <FilesUpload onClose={onClose} />}
        {modalType === 'delete-all' && <FilesDeleteAll onClose={onClose} />}
      </Modal>
    </>
  );
}

// Export
export default FilesMenu;
