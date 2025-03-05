/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
// Import store
import useFileStore from '@/stores/useFileStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import components
import FilesMenu from '../FilesMenu';
import Workspace from '../Workspace';
import WorkspaceMenu from '../WorkspaceMenu';
import { FileTree } from '../systems/FileTree';
import useAppTheme from '@/themes/useAppTheme';
import useEditorStore from '@/stores/useEditorStore';
import { LOCAL_STORAGE_KEYS } from '@/constants';

// File explorer component
function ExplorerPanel() {
  // Define stores
  const allFiles = useFileStore((state) => state.allFiles);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const isLoadingFiles = useFileStore((state) => state.isLoadingFiles);
  const setTabIndex = useEditorStore((state) => state.setTabIndex);

  // Define theme
  const { colorAlt, borderColor } = useAppTheme();

  // Define state
  const [isExpanded, setIsExpanded] = useState({});

  // Define memo
  const file = useMemo(() => {
    return [
      {
        isdir: true,
        isfile: false,
        location: `/workspaces/${currentWorkspace}`,
        name: currentWorkspace,
        _children: allFiles,
      },
    ];
  }, [currentWorkspace, allFiles]);

  // Define effects
  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    setIsExpanded(
      JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEYS.fileExplorerExpanded) || '{}'
      )
    );
  }, [currentWorkspace]);

  // Render
  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={3}>
      <VStack w="100%" fontSize="sm" gap={1}>
        <Text
          w="100%"
          as="h3"
          fontSize="xs"
          textTransform="uppercase"
          color={colorAlt}
        >
          Workspaces
        </Text>

        <HStack w="100%">
          <Workspace />

          <WorkspaceMenu />
        </HStack>
      </VStack>

      {isLoadingFiles ? (
        <VStack w="100%" flexGrow="1" justifyContent="center">
          <Spinner size="xl" color={borderColor} />
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
                border="1px solid"
                borderColor={borderColor}
                p={1}
                gap={0.5}
                overflowY="scroll"
                className="alt-scrollbar"
                onContextMenu={(e) => e.preventDefault()}
              >
                <FileTree
                  file={file}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  isRoot={true}
                />

                <Box
                  w="100%"
                  minH="1rem"
                  flexGrow="1"
                  onClick={() => {
                    setCurrentFile(null);
                    setCurrentFolder(null);
                    setTabIndex(-1);
                  }}
                />
              </VStack>
            </VStack>
          ) : (
            <Text w="100%" color={colorAlt}>
              No workspaces
            </Text>
          )}
        </>
      )}
    </VStack>
  );
}

// Export
export default ExplorerPanel;
