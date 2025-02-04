/* eslint-disable @typescript-eslint/no-explicit-any */

// Import dependencies
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useContext, useState } from 'react';
// Import context
import { appContext } from '../../../AppContext';
// Import hooks
import useFileSystem from '../../../hooks/useFileSystem';
// Import components
import FileItem from './FileItem';
import FilesMenu from './FilesMenu';
import Workspace from './Workspace';
import WorkspaceMenu from './WorkspaceMenu';
import NewFileItem from './NewFileItem';

// File explorer component
function Explorer() {
  // Define context
  const { files, currentFile, setCurrentFile, workspaces } =
    useContext(appContext);

  // Define file system
  const { handleLoadFileData } = useFileSystem();

  const [addingFile, setAddingFile] = useState(false);

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
              borderColor="gray.700"
              p={1}
              gap={0.5}
              overflow="scroll"
              className="alt-scrollbar"
            >
              {files.map((item: any, index: number) => (
                <FileItem
                  key={index}
                  file={item}
                  onClick={() => {
                    setCurrentFile(item);
                    handleLoadFileData(item);
                  }}
                  isActive={currentFile === item}
                >
                  {item}
                </FileItem>
              ))}
              {addingFile && <NewFileItem setAddingFile={setAddingFile} />}
              {/* <NewFileItem setAddingFile={setAddingFile} /> */}
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
