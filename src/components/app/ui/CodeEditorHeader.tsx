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
  LuRadio,
  LuSave,
  LuToggleLeft,
  LuToggleRight,
  LuZoomIn,
  LuZoomOut,
} from 'react-icons/lu';
// Import store
import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
import useLivePreviewStore from '@/store/useLivePreviewStore';
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
  const allCodes = useEditorStore((state) => state.allCodes);
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const setEditorZoom = useEditorStore((state) => state.setEditorZoom);
  const editorZoomIn = useEditorStore((state) => state.editorZoomIn);
  const editorZoomOut = useEditorStore((state) => state.editorZoomOut);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);
  const toggleEditorAutoSave = useEditorStore(
    (state) => state.toggleEditorAutoSave
  );
  const currentFile = useFileStore((state) => state.currentFile);
  const saveFile = useFileStore((state) => state.saveFile);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );
  const showPreview = useLivePreviewStore((state) => state.showPreview);
  const togglePreview = useLivePreviewStore((state) => state.togglePreview);

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
            disabled={allCodes.length < 1}
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
            _hover={{ borderColor: allCodes.length < 1 ? '' : 'gray.50' }}
            _focus={{ borderColor: 'blue.500' }}
            disabled={allCodes.length < 1}
          />

          <CodeEditorHeaderButton
            label="Zoom in"
            onClick={editorZoomIn}
            disabled={allCodes.length < 1}
          >
            <LuZoomIn />
          </CodeEditorHeaderButton>
        </HStack>

        <HStack gap={0} borderRight="1px solid" borderColor="gray.700">
          <CodeEditorHeaderButton
            label="Save file"
            onClick={() => {
              const fileToSave = allCodes.find((f) => f.file === currentFile);
              if (!fileToSave) {
                return;
              }

              const { file, code } = fileToSave;
              saveFile(file, code || '');
              refreshLivePreview();
              toast({
                title: 'File Saved',
                description: file,
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }}
            disabled={allCodes.length < 1}
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

        <Box borderRight="1px solid" borderColor="gray.700">
          <CodeEditorHeaderButton
            label={(showPreview ? 'Hide' : 'Show') + ' live preview'}
            onClick={togglePreview}
          >
            <LuRadio />
          </CodeEditorHeaderButton>
        </Box>
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
