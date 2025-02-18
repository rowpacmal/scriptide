/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// Import store
import useFileStore from '@/store/useFileStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import components
import FilesMenu from './FilesMenu';
import Workspace from './Workspace';
import WorkspaceMenu from './WorkspaceMenu';
import { LuArchive, LuChevronDown, LuChevronRight } from 'react-icons/lu';
import { FileTree } from './FileTree';

// File explorer component
function Explorer() {
  // Define stores
  const allFiles = useFileStore((state) => state.allFiles);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const currentFolder = useFileStore((state) => state.currentFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const isLoadingFiles = useFileStore((state) => state.isLoadingFiles);
  const isAddingFile = useFileStore((state) => state.isAddingFile);

  // Define state
  const [isExpanded, setIsExpanded] = useState({});

  // Define handlers
  function handleExpand() {
    const current = `/workspaces/${currentWorkspace}`;

    setIsExpanded((prevState) => {
      if (currentFolder !== current && isExpanded[current]) {
        return prevState;
      }

      const expand = {
        ...prevState,
        [current]: !prevState[current],
      };

      localStorage.setItem(
        `${currentWorkspace}-explorer-expanded`,
        JSON.stringify(expand)
      );

      return expand;
    });
  }

  // Define effects
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

        {isLoadingFiles ? (
          <VStack w="100%" flexGrow="1" justifyContent="center">
            <Spinner size="xl" color="gray.700" />
          </VStack>
        ) : (
          <>
            {workspaces.length > 0 ? (
              <VStack w="100%" h="100%" gap={1}>
                <FilesMenu />

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
                  // display="box"
                  onContextMenu={(e) => {
                    e.preventDefault();
                    // console.log('context menu');
                  }}
                >
                  <VStack
                    w="100%"
                    gap={0.5}
                    borderRadius="sm"
                    bg={
                      currentFolder === `/workspaces/${currentWorkspace}`
                        ? 'gray.800'
                        : ''
                    }
                  >
                    <HStack
                      cursor="pointer"
                      w="100%"
                      color="gray.500"
                      borderRadius="sm"
                      gap={1}
                      _hover={{ bg: 'gray.700' }}
                      onClick={() => {
                        setCurrentFolder(`/workspaces/${currentWorkspace}`);
                        handleExpand();
                      }}
                      onContextMenu={() =>
                        console.log(`/workspaces/${currentWorkspace}`)
                      }
                    >
                      <Box>
                        {isExpanded[`/workspaces/${currentWorkspace}`] ? (
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
                            <LuArchive />
                          </Box>

                          <Text as="span" userSelect="none" isTruncated>
                            {currentWorkspace}
                          </Text>
                        </Text>
                      </HStack>
                    </HStack>

                    {isExpanded[`/workspaces/${currentWorkspace}`] && (
                      <FileTree
                        file={allFiles}
                        isExpanded={isExpanded}
                        setIsExpanded={setIsExpanded}
                        isAddingFile={
                          isAddingFile &&
                          currentFolder === `/workspaces/${currentWorkspace}`
                        }
                      />
                    )}
                  </VStack>

                  <Box
                    w="100%"
                    minH="1rem"
                    flexGrow="1"
                    onClick={() => {
                      setCurrentFile(null);
                      setCurrentFolder(null);
                    }}
                  />
                </VStack>
              </VStack>
            ) : (
              <Text w="100%" color="gray.500">
                No workspaces
              </Text>
            )}
          </>
        )}
      </VStack>
    </>
  );
}

// Export
export default Explorer;
