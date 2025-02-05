// Import dependencies
import {
  Box,
  Button,
  HStack,
  Input,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import {
  LuChevronsLeft,
  LuChevronsRight,
  LuPlay,
  LuSave,
  LuToggleLeft,
  LuToggleRight,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
// Import context
import { appContext } from '../../../AppContext';
// Import hooks
import useFileSystem from '../../../hooks/useFileSystem';
import useRunScript from '../../../hooks/useRunScript';

// Code editor header button component
function CodeEditorHeaderButton({
  children,
  label,
  hoverColor = 'gray.50',
  onClick,
  disabled = false,
}) {
  // Render
  return (
    <Tooltip label={label} placement="bottom" hasArrow>
      <Button
        size="sm"
        bg="transparent"
        color="gray.500"
        p={0}
        _hover={{
          bg: 'transparent',
          color: disabled ? '' : hoverColor,
        }}
        _active={{
          bg: 'transparent',
        }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
    </Tooltip>
  );
}

// Code editor header component
function CodeEditorHeader({ isOverviewCollapsed, handelToggleOverview }) {
  // Define toast
  const toast = useToast();

  // Define context
  const { code, editorZoom, setEditorZoom, editorAutoSave, setEditorAutoSave } =
    useContext(appContext);

  // Define handlers
  const handleRunScript = useRunScript();
  const { handleSaveFileData } = useFileSystem();

  // Render
  return (
    <HStack gap={0} justify="space-between">
      <HStack gap={0}>
        <Box borderRight="1px solid" borderColor="gray.700">
          <CodeEditorHeaderButton
            label="Run script"
            hoverColor="green.500"
            onClick={handleRunScript}
            disabled={code === null}
          >
            <LuPlay />
          </CodeEditorHeaderButton>
        </Box>

        <HStack gap={0} borderRight="1px solid" borderColor="gray.700">
          <CodeEditorHeaderButton
            label="Zoom out"
            onClick={() =>
              setEditorZoom((prevState) => {
                if (prevState > -6) {
                  const zoomOut = prevState - 1;
                  localStorage.setItem('editor-zoom', JSON.stringify(zoomOut));
                  return zoomOut;
                }
                return prevState;
              })
            }
            disabled={code === null}
          >
            <LuZoomOut />
          </CodeEditorHeaderButton>

          <Input
            value={editorZoom}
            onChange={(e) => {
              const zoom = Number(e.target.value);

              if (!isNaN(zoom)) {
                setEditorZoom(zoom);
                localStorage.setItem('editor-zoom', JSON.stringify(zoom));
              }
            }}
            size="xs"
            maxW={8}
            textAlign="center"
          />

          <CodeEditorHeaderButton
            label="Zoom in"
            onClick={() =>
              setEditorZoom((prevState) => {
                const zoomIn = prevState + 1;
                localStorage.setItem('editor-zoom', JSON.stringify(zoomIn));
                return zoomIn;
              })
            }
            disabled={code === null}
          >
            <LuZoomIn />
          </CodeEditorHeaderButton>
        </HStack>

        <HStack gap={0} borderRight="1px solid" borderColor="gray.700">
          <CodeEditorHeaderButton
            label="Save file"
            onClick={() => {
              handleSaveFileData();
              toast({
                title: 'File Saved',
                description: 'The file has been saved successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }}
            disabled={code === null}
          >
            <LuSave />
          </CodeEditorHeaderButton>

          <CodeEditorHeaderButton
            label={`Auto save: ${editorAutoSave ? 'on' : 'off'}`}
            onClick={() =>
              setEditorAutoSave((prevState: boolean) => {
                localStorage.setItem(
                  'editor-auto-save',
                  JSON.stringify(!prevState)
                );
                return !prevState;
              })
            }
          >
            {editorAutoSave ? (
              <Box as="span" color="green.500">
                <LuToggleRight size={20} />
              </Box>
            ) : (
              <LuToggleLeft size={20} />
            )}
          </CodeEditorHeaderButton>
        </HStack>
      </HStack>

      <Box>
        <CodeEditorHeaderButton
          label={`${isOverviewCollapsed ? 'Show' : 'Hide'} overview`}
          onClick={handelToggleOverview}
        >
          {isOverviewCollapsed ? <LuChevronsLeft /> : <LuChevronsRight />}
        </CodeEditorHeaderButton>
      </Box>
    </HStack>
  );
}

// Export
export default CodeEditorHeader;
