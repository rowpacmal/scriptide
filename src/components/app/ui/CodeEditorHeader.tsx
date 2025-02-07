// Import dependencies
import {
  Box,
  Button,
  HStack,
  Input,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
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
// Import store
import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
// Import hooks
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

  // Define store
  const code = useEditorStore((state) => state.code);
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const setEditorZoom = useEditorStore((state) => state.setEditorZoom);
  const editorZoomIn = useEditorStore((state) => state.editorZoomIn);
  const editorZoomOut = useEditorStore((state) => state.editorZoomOut);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);
  const toggleEditorAutoSave = useEditorStore(
    (state) => state.toggleEditorAutoSave
  );
  const saveFile = useFileStore((state) => state.saveFile);

  // Define handlers
  const handleRunScript = useRunScript();

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
            onClick={editorZoomOut}
            disabled={code === null}
          >
            <LuZoomOut />
          </CodeEditorHeaderButton>

          <Input
            value={editorZoom}
            onChange={(e) => {
              setEditorZoom(Number(e.target.value));
            }}
            size="xs"
            maxW={8}
            textAlign="center"
            _hover={{ borderColor: code === null ? '' : 'gray.50' }}
            _focus={{ borderColor: 'blue.500' }}
            disabled={code === null}
          />

          <CodeEditorHeaderButton
            label="Zoom in"
            onClick={editorZoomIn}
            disabled={code === null}
          >
            <LuZoomIn />
          </CodeEditorHeaderButton>
        </HStack>

        <HStack gap={0} borderRight="1px solid" borderColor="gray.700">
          <CodeEditorHeaderButton
            label="Save file"
            onClick={() => {
              saveFile();
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
            onClick={toggleEditorAutoSave}
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
