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
import isImageFile from '@/utils/isImageFile';
import { useEffect, useMemo, useState } from 'react';
import useAppTheme from '@/themes/useAppTheme';

// Code editor header button component
function CodeEditorHeaderButton({
  children,
  label,
  hoverColor = '',
  onClick,
  disabled = false,
}) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <Tooltip label={label} placement="bottom" hasArrow>
      <Button
        size="sm"
        bg="transparent"
        color={colorAlt}
        p={0}
        _hover={{
          bg: 'transparent',
          color: disabled ? '' : hoverColor || color,
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

  // Define theme
  const { accent, borderColor, color } = useAppTheme();

  // Define store
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
  const togglePreview = useLivePreviewStore((state) => state.togglePreview);

  // Define states
  const [zoom, setZoom] = useState(editorZoom || '0');

  // Define memo
  const disableButton = useMemo(
    () => currentFile === null || isImageFile(currentFile),
    [currentFile]
  );

  // Define handlers
  function handleEditorZoom() {
    if (zoom === '-') {
      setZoom(editorZoom);
      return;
    }

    const currentZoom = Number(zoom);

    if (!currentZoom && currentZoom !== 0) {
      return;
    }
    if (isNaN(currentZoom)) {
      setEditorZoom(editorZoom);
      return;
    }

    setEditorZoom(currentZoom);
  }

  // Define effects
  useEffect(() => {
    setZoom(editorZoom);
  }, [editorZoom]);

  // Render
  return (
    <HStack gap={0} justify="space-between">
      <HStack gap={0}>
        {/* <Box borderRight="1px solid" borderColor={borderColor}>
          <CodeEditorHeaderButton
            label="Run script"
            hoverColor={colorSuccess}
            onClick={handleRunScript}
            disabled={disableButton}
          >
            <TbPlayerPlayFilled />
          </CodeEditorHeaderButton>
        </Box> */}

        <HStack gap={0} borderRight="1px solid" borderColor={borderColor}>
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
            disabled={disableButton}
          >
            <LuSave />
          </CodeEditorHeaderButton>

          <CodeEditorHeaderButton
            label={`Auto save: ${editorAutoSave ? 'on' : 'off'}`}
            onClick={toggleEditorAutoSave}
          >
            {editorAutoSave ? (
              <Box as="span" color={accent}>
                <LuToggleRight size={20} />
              </Box>
            ) : (
              <LuToggleLeft size={20} />
            )}
          </CodeEditorHeaderButton>
        </HStack>

        <HStack gap={0} borderRight="1px solid" borderColor={borderColor}>
          <CodeEditorHeaderButton
            label="Zoom out"
            onClick={editorZoomOut}
            disabled={disableButton || editorZoom <= -6}
          >
            <LuZoomOut />
          </CodeEditorHeaderButton>

          <Input
            value={zoom}
            onChange={(e) => {
              const { value } = e.target;
              if (!/(^-[1-6]|[0-9]|[1-9][0-9])?$/.test(value)) {
                return;
              }
              if (
                Number(value) < -6 ||
                Number(value) > 99 ||
                (value.startsWith('0') && value.length > 1) ||
                value.startsWith('--') ||
                (!value.startsWith('-') && isNaN(Number(value)))
              ) {
                return;
              }

              setZoom(value);
            }}
            size="xs"
            maxW={8}
            textAlign="center"
            borderColor={borderColor}
            _hover={{ borderColor: disableButton ? '' : color }}
            _focusVisible={{
              borderColor: accent,
            }}
            disabled={disableButton}
            onBlur={handleEditorZoom}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEditorZoom();
              }
            }}
          />

          <CodeEditorHeaderButton
            label="Zoom in"
            onClick={editorZoomIn}
            disabled={disableButton}
          >
            <LuZoomIn />
          </CodeEditorHeaderButton>
        </HStack>
      </HStack>

      <Box>
        <CodeEditorHeaderButton
          label={`${isOverviewCollapsed ? 'Show' : 'Hide'} live preview`}
          onClick={() => {
            togglePreview();
            handelToggleOverview();
          }}
        >
          {isOverviewCollapsed ? <LuChevronsLeft /> : <LuChevronsRight />}
        </CodeEditorHeaderButton>
      </Box>
    </HStack>
  );
}

// Export
export default CodeEditorHeader;
