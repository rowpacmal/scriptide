import useWorkspaceStore from '@/store/useWorkspaceStore';
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { LuChevronDown, LuChevronRight, LuFolder } from 'react-icons/lu';
import FileItem from './FileItem';
import useFileStore from '@/store/useFileStore';
import FileItemAdd from './FileItemAdd';
import FileItemRename from './FileItemRename';
import { FolderItemContextMenu } from './ContextMenu';
import { useEffect, useState } from 'react';

function FileTree({
  file,
  isExpanded,
  setIsExpanded,
  isAddingFile = false,
  isRoot = false,
}) {
  return (
    <Box w="100%" pl={!isRoot ? 2 : 0}>
      <VStack
        w="100%"
        pl={!isRoot ? 2 : 0}
        pb={!isRoot ? 2 : 0}
        borderLeft={!isRoot ? '1px solid' : ''}
        borderColor={!isRoot ? 'whiteAlpha.100' : ''}
        gap={0.5}
      >
        {file.length > 0 ? (
          <>
            {file
              .sort((a, b) => a.isfile - b.isfile)
              .map((file, index) => (
                <FileTreeItem
                  key={index}
                  file={file}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                />
              ))}
          </>
        ) : (
          <>
            {!isAddingFile && (
              <Text w="100%" color="gray.700" px={2} userSelect="none">
                -- empty --
              </Text>
            )}
          </>
        )}

        {isAddingFile && <FileItemAdd />}
      </VStack>
    </Box>
  );
}

function FolderItem({ file, isExpanded, setIsExpanded, isActive }) {
  // Define stores
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const isAddingFile = useFileStore((state) => state.isAddingFile);

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
    <VStack
      w="100%"
      gap={0.5}
      borderRadius="sm"
      bg={isActive ? 'gray.800' : ''}
    >
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
                borderColor={isOpen ? 'gray.500' : 'transparent'}
                // borderColor={
                //   isOpen ? (isActive ? 'blue.500' : 'gray.500') : 'transparent'
                // }
                justifyContent="space-between"
                gap={0}
                color="gray.500"
                // color={isActive ? 'gray.50' : 'gray.500'}
                bg={isOpen ? 'gray.700' : ''}
                // bg={isActive ? 'blue.700' : isOpen ? 'gray.700' : 'transparent'}
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

function FileTreeItem({ file, isExpanded, setIsExpanded }) {
  // Define store
  const currentFile = useFileStore((state) => state.currentFile);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const loadFile = useFileStore((state) => state.loadFile);

  if (file.isfile) {
    return (
      <FileItem
        file={file}
        onClick={() => {
          setCurrentFolder(file.location.split('/').slice(0, -1).join('/'));
          setCurrentFile(file.location);
          loadFile(file.location);
        }}
        isActive={file.location === currentFile}
      >
        {file.name}
      </FileItem>
    );
  } else {
    return (
      <FolderItem
        file={file}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isActive={file.location === currentFolder}
      />
    );
  }
}

export { FileTree, FolderItem, FileTreeItem };
