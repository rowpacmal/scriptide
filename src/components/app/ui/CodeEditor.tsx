// Import dependencies
import { Box, useToast } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
// Import store
import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
import useLivePreviewStore from '@/store/useLivePreviewStore';
// Import constants
import { DEFAULT_EDITOR_THEME } from '@/constants';
// Import utilities
import getExtension from '@/utils/getExtension';

function CodeEditor({ index, file, code }) {
  // Define toast
  const toast = useToast();

  // Define refs
  const editorRef = useRef(null);

  // Define store
  const updateCode = useEditorStore((state) => state.updateCode);
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const editorAutoSave = useEditorStore((state) => state.editorAutoSave);
  const saveFile = useFileStore((state) => state.saveFile);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );

  // Define state
  const [lang, setLang] = useState('plaintext');

  // Define handlers
  function handleOnMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }
  function handleOnSave() {
    saveFile(file, code);
    refreshLivePreview();
  }

  // Define effect
  useEffect(() => {
    if (file) {
      setLang(getExtension(file));
    }
  }, [file]);

  // Render
  return (
    <Box
      h="100%"
      onBlur={() => {
        if (editorAutoSave) {
          handleOnSave();
        }
      }}
      onKeyDown={(e) => {
        e.preventDefault();
        if (e.key === 's' && e.ctrlKey) {
          handleOnSave();
          toast({
            title: 'File saved',
            description: file,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      }}
    >
      <Editor
        height="100%"
        theme={DEFAULT_EDITOR_THEME}
        language={lang}
        onMount={handleOnMount}
        value={code}
        onChange={(value) => updateCode(index, value || '')}
        options={{
          fontSize: 12 + editorZoom, // Font size
          fixedOverflowWidgets: true, // Prevents widgets from overflowing
        }}
      />
    </Box>
  );
}

// Export
export default CodeEditor;
