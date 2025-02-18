import useWorkspaceStore from '@/store/useWorkspaceStore';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { LuChevronDown, LuChevronRight, LuFolder } from 'react-icons/lu';
import FileItem from './FileItem';
import useFileStore from '@/store/useFileStore';
import FileItemAdd from './FileItemAdd';

function FileTree({ file, isExpanded, setIsExpanded, isAddingFile }) {
  return (
    <Box w="100%" pl={2}>
      <VStack
        w="100%"
        pl={2}
        pb={2}
        borderLeft="1px solid"
        borderColor="whiteAlpha.100"
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
          <Text w="100%" color="gray.700" px={2}>
            -- empty --
          </Text>
        )}

        {isAddingFile && <FileItemAdd />}
      </VStack>
    </Box>
  );
}

function FileTreeFolder({ file, isExpanded, setIsExpanded, isActive }) {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const isAddingFile = useFileStore((state) => state.isAddingFile);

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

  return (
    <VStack
      w="100%"
      gap={0.5}
      borderRadius="sm"
      bg={isActive ? 'gray.800' : ''}
    >
      <HStack
        cursor="pointer"
        w="100%"
        color="gray.500"
        borderRadius="sm"
        gap={1}
        _hover={{ bg: 'gray.700' }}
        onClick={() => {
          setCurrentFolder(file.location);
          handleExpand();
        }}
        onContextMenu={() => console.log(file.location)}
      >
        <Box>
          {isExpanded[file.location] ? (
            <LuChevronDown size={16} />
          ) : (
            <LuChevronRight size={16} />
          )}
        </Box>

        <HStack w="100%" gap={0} isTruncated>
          <Text w="100%" display="flex" gap={1} alignItems="center" isTruncated>
            <Box as="span">
              <LuFolder />
            </Box>

            <Text as="span" userSelect="none" isTruncated>
              {file.name}
            </Text>
          </Text>
        </HStack>
      </HStack>

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
      <FileTreeFolder
        file={file}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isActive={file.location === currentFolder}
      />
    );
  }
}

export { FileTree, FileTreeFolder, FileTreeItem };
