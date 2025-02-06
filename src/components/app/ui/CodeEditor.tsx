// Import dependencies
import { Box } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
// Import store
import useEditorStore from '@/store/useEditorStore';
// Import hooks
import useFileSystem from '../../../hooks/useFileSystem';
// Import constants
import { DEFAULT_EDITOR_THEME, KISS_VM_LANGUAGE } from '../../../constants';

function CodeEditor() {
  // Define refs
  const editorRef = useRef(null);

  // Define store
  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);

  // Define file system
  const { handleSaveFileData } = useFileSystem();

  // Define handlers
  function handleOnMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  // Render
  return (
    <Box
      h="100%"
      borderTop="1px solid"
      borderColor="gray.700"
      onBlur={() => {
        if (editorAutoSave && code) {
          handleSaveFileData();
        }
      }}
    >
      {code !== null ? (
        <Editor
          height="100%"
          theme={DEFAULT_EDITOR_THEME}
          language={KISS_VM_LANGUAGE}
          onMount={handleOnMount}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 12 + editorZoom, // Font size
            fixedOverflowWidgets: true, // Prevents widgets from overflowing
          }}
        />
      ) : (
        <Box
          h="100%"
          display="grid"
          placeItems="center"
          color="gray.500"
          fontSize="sm"
        >
          No file opened
        </Box>
      )}
    </Box>
  );
}

// Export
export default CodeEditor;
