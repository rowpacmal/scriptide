import useWorkspaceStore from '@/store/useWorkspaceStore';
import { FileTree } from './FileTree';
import useFileStore from '@/store/useFileStore';
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FileItemRename from './FileItemRename';
import { LuChevronDown, LuChevronRight, LuFolder } from 'react-icons/lu';
import { FolderItemContextMenu } from '../ContextMenu';
import useAppTheme from '@/themes/useAppTheme';

function FolderItem({ file, isExpanded, setIsExpanded, isActive }) {
  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const isAddingFile = useFileStore((state) => state.isAddingFile);

  // Define theme
  const { accent, color, colorAlt, bgAlt, borderColor } = useAppTheme();

  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define state
  const [renamingFile, setRenamingFile] = useState(false);

  // Define handlers
  const handleContextMenu = (e) => {
    e.preventDefault(); // Disable default menu
    onOpen();
  };

  function handleExpand() {
    setIsExpanded((prevState) => {
      if (currentFolder !== file.location && isExpanded[file.location]) {
        return prevState;
      }

      const expand = {
        ...prevState,
        [file.location]: !prevState[file.location],
      };

      localStorage.setItem(
        `${currentWorkspace}-explorer-expanded`,
        JSON.stringify(expand)
      );

      return expand;
    });
  }

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

  return (
    <VStack w="100%" gap={0.5} borderRadius="sm" bg={isActive ? bgAlt : ''}>
      {renamingFile ? (
        <FileItemRename file={file} setRenamingFile={setRenamingFile} />
      ) : (
        <Box
          cursor="pointer"
          w="100%"
          _hover={{ bg: borderColor, color }}
          borderRadius="sm"
        >
          <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start">
            <MenuButton
              as="div"
              w="100%"
              onClick={() => {
                setCurrentFolder(file.location);
                handleExpand();
              }}
              onContextMenu={(e) => {
                setCurrentFolder(file.location);
                handleContextMenu(e);
              }}
            >
              <HStack
                w="100%"
                borderRadius="sm"
                border="1px solid"
                borderColor={isOpen ? accent : 'transparent'}
                justifyContent="space-between"
                gap={0}
                color={colorAlt}
                bg={isOpen ? borderColor : ''}
              >
                <Box>
                  {isExpanded[file.location] ? (
                    <LuChevronDown size={16} />
                  ) : (
                    <LuChevronRight size={16} />
                  )}
                </Box>

                <HStack w="100%" gap={0} isTruncated>
                  <Text
                    w="100%"
                    display="flex"
                    gap={1}
                    alignItems="center"
                    isTruncated
                  >
                    <Box as="span">
                      <LuFolder />
                    </Box>

                    <Text as="span" userSelect="none" isTruncated>
                      {file.name}
                    </Text>
                  </Text>
                </HStack>
              </HStack>
            </MenuButton>

            <FolderItemContextMenu
              file={file}
              setRenamingFile={setRenamingFile}
            />
          </Menu>
        </Box>
      )}

      {isExpanded[file.location] && (
        <FileTree
          file={file._children}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isAddingFile={isAddingFile && file.location === currentFolder}
        />
      )}
    </VStack>
  );
}

export default FolderItem;
