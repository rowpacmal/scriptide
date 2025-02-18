import useWorkspaceStore from '@/store/useWorkspaceStore';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { LuChevronDown, LuChevronRight, LuFolder } from 'react-icons/lu';
import FileItem from './FileItem';
import useFileStore from '@/store/useFileStore';

function FileTree({ file, isExpanded, setIsExpanded }) {
  return (
    <Box w="100%" pl={2}>
      <VStack
        w="100%"
        pl={2}
        pb={2}
        borderLeft="1px solid"
        // borderBottom="1px solid"
        borderColor="gray.800"
        // borderEndStartRadius="md"
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
      </VStack>
    </Box>
  );
}

function FileTreeFolder({ file, isExpanded, setIsExpanded }) {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  return (
    <VStack w="100%" gap={0.5}>
      <HStack w="100%" bg="gray.800" borderRadius="sm" gap={0}>
        <Button
          size="xs"
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'gray.50' }}
          p={0}
          onClick={() =>
            setIsExpanded((prevState) => {
              const expand = {
                ...prevState,
                [file.location]: !prevState[file.location],
              };

              localStorage.setItem(
                `${currentWorkspace}-explorer-expanded`,
                JSON.stringify(expand)
              );

              return expand;
            })
          }
        >
          {isExpanded[file.location] ? <LuChevronDown /> : <LuChevronRight />}
        </Button>

        <HStack w="100%" gap={0} color="gray.500" isTruncated>
          <Text w="100%" display="flex" gap={1} alignItems="center" isTruncated>
            <Box as="span">
              <LuFolder />
            </Box>

            <Text as="span" isTruncated>
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
        />
      )}
    </VStack>
  );
}

function FileTreeItem({ file, isExpanded, setIsExpanded }) {
  // Define store
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const loadFile = useFileStore((state) => state.loadFile);

  if (file.isfile) {
    return (
      <FileItem
        file={file.name}
        onClick={() => {
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
      />
    );
  }
}

export { FileTree, FileTreeFolder, FileTreeItem };
