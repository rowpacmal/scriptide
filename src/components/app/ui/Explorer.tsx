/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// Import store
import useFileStore from '@/store/useFileStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import components
import FilesMenu from './FilesMenu';
import Workspace from './Workspace';
import WorkspaceMenu from './WorkspaceMenu';
import FileItemAdd from './FileItemAdd';
import { LuArchive } from 'react-icons/lu';
import { FileTree } from './FileTree';

// File explorer component
function Explorer() {
  // Define stores
  const allFiles = useFileStore((state) => state.allFiles);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define state
  const [addingFile, setAddingFile] = useState(false);
  const [isExpanded, setIsExpanded] = useState({});

  useEffect(() => {
    setIsExpanded(
      JSON.parse(
        localStorage.getItem(`${currentWorkspace}-explorer-expanded`) || '{}'
      )
    );
  }, [currentWorkspace]);

  // Render
  return (
    <>
      <VStack w="100%" h="100%" fontSize="sm" gap={3}>
        <VStack w="100%" fontSize="sm" gap={1}>
          <Text
            w="100%"
            as="h3"
            fontSize="xs"
            textTransform="uppercase"
            color="gray.500"
          >
            Workspaces
          </Text>

          <HStack w="100%">
            <Workspace />

            <WorkspaceMenu workspaces={workspaces} />
          </HStack>
        </VStack>

        {workspaces.length > 0 ? (
          <VStack w="100%" h="100%" gap={1}>
            <FilesMenu addingFile={addingFile} setAddingFile={setAddingFile} />

            <VStack
              id="FILE_EXPLORER"
              w="100%"
              flexGrow="1"
              maxH="32rem"
              borderTop="1px solid"
              borderLeft="1px solid"
              borderBottom="1px solid"
              borderColor="gray.700"
              p={1}
              gap={0.5}
              overflowY="scroll"
              className="alt-scrollbar"
              display="box"
            >
              <VStack w="100%" gap={0.5}>
                <HStack
                  w="100%"
                  bg="gray.800"
                  color="gray.500"
                  borderRadius="sm"
                  px={2}
                  gap={0}
                  isTruncated
                >
                  <Text
                    w="100%"
                    display="flex"
                    gap={1}
                    alignItems="center"
                    isTruncated
                  >
                    <Box as="span">
                      <LuArchive />
                    </Box>

                    <Text as="span" isTruncated>
                      {currentWorkspace}
                    </Text>
                  </Text>
                </HStack>

                <FileTree
                  file={allFiles}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                />
              </VStack>

              {addingFile && <FileItemAdd setAddingFile={setAddingFile} />}

              <Box
                w="100%"
                minH="1rem"
                flexGrow="1"
                onContextMenu={(e) => {
                  e.preventDefault();
                  console.log('context menu');
                }}
              />
            </VStack>
          </VStack>
        ) : (
          <Text w="100%" color="gray.500">
            No workspaces
          </Text>
        )}
      </VStack>
    </>
  );
}

// Export
export default Explorer;
