import useWorkspaceStore from '@/store/useWorkspaceStore';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import {
  LuChevronDown,
  LuChevronRight,
  LuFile,
  LuFolder,
} from 'react-icons/lu';

function FileTreeFolder({ file, isExpanded, setIsExpanded }) {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  return (
    <VStack w="100%" gap={0.5}>
      <HStack w="100%" bg="blue.700" borderRadius="sm" gap={0}>
        <Button
          size="xs"
          bg="transparent"
          color="blue.200"
          _hover={{ bg: 'transparent', color: 'blue.50' }}
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

        <HStack w="100%">
          <LuFolder />

          <Text w="100%">{file.name}</Text>
        </HStack>
      </HStack>

      {isExpanded[file.location] && (
        <Box w="100%" pl={2}>
          <VStack
            w="100%"
            pl={2}
            pb={2}
            borderLeft="1px solid"
            // borderBottom="1px solid"
            borderColor="blue.700"
            // borderEndStartRadius="md"
            gap={0.5}
          >
            {file._children.length > 0 ? (
              <>
                {file._children
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
      )}
    </VStack>
  );
}

function FileTreeItem({ file, isExpanded, setIsExpanded }) {
  if (file.isfile) {
    return (
      <HStack w="100%" bg="gray.700" borderRadius="sm" px={2}>
        <LuFile />

        <Text w="100%">{file.name}</Text>
      </HStack>
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

export default FileTreeItem;
