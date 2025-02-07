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
  // LuFolderPlus,
  // LuHardDriveUpload
} from 'react-icons/lu';
// Import store
import useFileStore from '@/store/useFileStore';
import FilesDeleteAll from './FilesDeleteAll';

// Constants
const ICON_SIZE = 20;

// Files menu item component
function FilesMenuItem({ children, label, onClick, disabled = false }) {
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
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

// Files menu component
function FilesMenu({ addingFile, setAddingFile }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define store
  const files = useFileStore((state) => state.files);
  // const addFile = useFileStore((state) => state.addFile); // For debugging

  // Render
  return (
    <>
      <HStack w="100%" px={2} gap={1}>
        <FilesMenuItem
          label="Create new file"
          // onClick={() => addFile(`New_File_${files.length}.kvm`)} // For debugging
          onClick={() => !addingFile && setAddingFile(true)}
          disabled={files.length >= 30} // Increased limit from 8 to 30
        >
          <LuFilePlus size={ICON_SIZE} />
        </FilesMenuItem>

        <FilesMenuItem
          label="Delete all files"
          onClick={onOpen}
          disabled={files.length < 1}
        >
          <LuTrash2 size={ICON_SIZE} />
        </FilesMenuItem>

        {/* TODO - Add folder and upload support */}
        {/* <FilesMenuItem label="Create new folder" onClick={() => {}} disabled>
        <LuFolderPlus size={ICON_SIZE} />
      </FilesMenuItem>

      <FilesMenuItem
        label="Add a File or Folder from your computer"
        onClick={() => {}}
        disabled
      >
        <LuHardDriveUpload size={ICON_SIZE} />
      </FilesMenuItem> */}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <FilesDeleteAll onClose={onClose} />
      </Modal>
    </>
  );
}

// Export
export default FilesMenu;
