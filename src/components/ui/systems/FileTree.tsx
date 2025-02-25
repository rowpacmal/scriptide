import { Box, Text, VStack } from '@chakra-ui/react';
import FileItem from './FileItem';
import useFileStore from '@/stores/useFileStore';
import FileItemAdd from './FileItemAdd';
import FolderItem from './FolderItem';
import useAppTheme from '@/themes/useAppTheme';

function FileTree({
  file,
  isExpanded,
  setIsExpanded,
  isAddingFile = false,
  isRoot = false,
}) {
  // Define theme
  const { borderColor, borderColorAlt } = useAppTheme();

  return (
    <Box w="100%" pl={!isRoot ? 2 : 0}>
      <VStack
        w="100%"
        pl={!isRoot ? 2 : 0}
        pb={!isRoot ? 2 : 0}
        borderLeft={!isRoot ? '1px solid' : ''}
        borderColor={!isRoot ? borderColorAlt : ''}
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
              <Text w="100%" color={borderColor} px={2} userSelect="none">
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
      />
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

export { FileTree, FileTreeItem };
