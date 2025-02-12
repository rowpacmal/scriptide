// Import dependencies
import { Box, Image } from '@chakra-ui/react';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
// Import store
import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
// Import constants
import { DEFAULT_EDITOR_THEME } from '@/constants';
// Import libraries
import minima from '@/lib/minima';
// Import utilities
import getExtension from '@/utils/getExtension';
import isImageFileName from '@/utils/isImageFileName';
import base64ToImage from '@/utils/base64ToImage';

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
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define state
  const [lang, setLang] = useState('plaintext');
  const [imgSrc, setImgSrc]: [string | null, any] = useState(null);

  // Define handlers
  function handleOnMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }
  async function handleImageFile() {
    const binary = (
      await minima.file.loadbinary(
        `workspaces/${currentWorkspace}/${currentFile}`
      )
    ).response.load.data;
    const base64 = minima.util.hexToBase64(binary);

    setImgSrc(base64ToImage(base64));
  }

  // Define effect
  useEffect(() => {
    if (currentFile) {
      setLang(getExtension(currentFile));

      if (isImageFileName(currentFile)) {
        handleImageFile();
      }
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
        <>
          {isImageFileName(currentFile) ? (
            <Image w="auto" h="auto" p={4} src={imgSrc || ''} />
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
        </>
      )}
    </Box>
  );
}

// Export
export default CodeEditor;
