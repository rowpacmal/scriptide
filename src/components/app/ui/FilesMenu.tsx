// Import dependencies
import { Button, HStack, Tooltip } from '@chakra-ui/react';
import { LuFilePlus, LuFolderPlus, LuHardDriveUpload } from 'react-icons/lu';
import useFileSystem from '../../hooks/useFileSystem';
import { appContext } from '../../AppContext';
import { useContext } from 'react';

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
function FilesMenu() {
  // Define context
  const { files } = useContext(appContext);

  // Define file system
  const { handleNewFile } = useFileSystem();

  // Render
  return (
    <HStack w="100%" px={2} gap={1}>
      <FilesMenuItem
        label="Create new file"
        onClick={() => handleNewFile(`Script_${Date.now()}`)}
        disabled={files.length >= 8}
      >
        <LuFilePlus size={ICON_SIZE} />
      </FilesMenuItem>

      <FilesMenuItem label="Create new folder" onClick={() => {}} disabled>
        <LuFolderPlus size={ICON_SIZE} />
      </FilesMenuItem>

      <FilesMenuItem
        label="Add a File or Folder from your computer"
        onClick={() => {}}
        disabled
      >
        <LuHardDriveUpload size={ICON_SIZE} />
      </FilesMenuItem>
    </HStack>
  );
}

// Export
export default FilesMenu;
