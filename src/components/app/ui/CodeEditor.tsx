// Import dependencies
import { Box } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
// Import store
import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
// Import constants
import { DEFAULT_EDITOR_THEME } from '../../../constants';
// Import utilities
import getExtension from '@/utils/getExtension';

function CodeEditor() {
  // Define refs
  const editorRef = useRef(null);

  // Define store
  const code = useEditorStore((state) => state.code);
  const setCode = useEditorStore((state) => state.setCode);
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);
  const saveFile = useFileStore((state) => state.saveFile);
  const currentFile = useFileStore((state) => state.currentFile);

  // Define state
  const [lang, setLang] = useState('plaintext');

  // Define handlers
  function handleOnMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  // Define effect
  useEffect(() => {
    if (currentFile) {
      setLang(getExtension(currentFile));
    }
  }, [currentFile]);

  // Render
  return (
    <Box
      h="100%"
      borderTop="1px solid"
      borderColor="gray.700"
      onBlur={() => {
        if (editorAutoSave && code) {
          saveFile();
        }
      }}
    >
      {code !== null ? (
        <Editor
          height="100%"
          theme={DEFAULT_EDITOR_THEME}
          language={lang}
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
