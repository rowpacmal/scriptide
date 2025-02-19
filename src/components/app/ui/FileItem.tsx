// Import dependencies
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  // LuBug,
  // LuCopy,
  LuFile,
} from 'react-icons/lu';
// Import components
import FileItemRename from './FileItemRename';
import { FileItemContextMenu } from './ContextMenu';

// File item context menu component

// File item component
function FileItem({ file, onClick, isActive = false }) {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define state
  const [renamingFile, setRenamingFile] = useState(false);

  // Define handlers
  const handleContextMenu = (event) => {
    event.preventDefault(); // Disable default menu
    onOpen();
  };

  /* Quick fix for a glitch where the context menu
   * would not close when scrolling.
   */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).document
      .querySelector('#FILE_EXPLORER')
      ?.addEventListener('scroll', onClose);
    return () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).document
        .querySelector('#FILE_EXPLORER')
        ?.addEventListener('scroll', onClose);
  }, []);

  // Render
  return (
    <>
      {renamingFile ? (
        <FileItemRename file={file} setRenamingFile={setRenamingFile} />
      ) : (
        <Box
          cursor="pointer"
          w="100%"
          _hover={{ bg: 'gray.700', color: 'gray.50' }}
          borderRadius="sm"
        >
          <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start">
            <MenuButton
              as="div"
              w="100%"
              onClick={onClick}
              onContextMenu={handleContextMenu}
            >
              <HStack
                w="100%"
                borderRadius="sm"
                border="1px solid"
                borderColor={isOpen ? 'blue.500' : 'transparent'}
                // borderColor={
                //   isOpen ? (isActive ? 'blue.500' : 'gray.500') : 'transparent'
                // }
                justifyContent="space-between"
                gap={0}
                pl={2}
                pr={1}
                color={isActive ? 'blue.500' : 'gray.500'}
                bg={isOpen ? 'gray.700' : ''}
                // bg={isActive ? 'blue.700' : isOpen ? 'gray.700' : 'transparent'}
              >
                <Text
                  w="100%"
                  display="flex"
                  gap={1}
                  alignItems="center"
                  isTruncated
                >
                  <Box as="span">
                    <LuFile />
                  </Box>

                  <Text as="span" userSelect="none" isTruncated>
                    {file.name}
                  </Text>
                </Text>
              </HStack>
            </MenuButton>

            <FileItemContextMenu
              file={file}
              setRenamingFile={setRenamingFile}
            />
          </Menu>
        </Box>
      )}
    </>
  );
}

// Export
export default FileItem;
