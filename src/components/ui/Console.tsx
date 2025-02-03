import { Box } from '@chakra-ui/react';
import { appContext } from '../../AppContext';
import { useContext, useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';

// Console component
function Console() {
  // Define refs
  const consoleOutputRef = useRef(null);

  // Define context
  const { consoleOutput, consoleTimestamp, editorZoom } =
    useContext(appContext);

  // Define functions
  function handleOnMount(editor) {
    consoleOutputRef.current = editor;
  }

  // Scroll to the bottom whenever the value updates
  useEffect(() => {
    if (consoleOutputRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const consoleOutput: any = consoleOutputRef.current;
      const model = consoleOutput.getModel();

      if (model) {
        const lineCount = model.getLineCount();
        consoleOutput.revealLine(lineCount); // Scroll to the last line
      }
    }
  }, [consoleOutput]);

  // Render
  return (
    <Box h="100%" borderTop="1px solid" borderColor="gray.700">
      <Editor
        height="100%"
        theme="minima-dark"
        language="json"
        onMount={handleOnMount}
        value={consoleOutput.join('\n')}
        options={{
          fontSize: 12 + editorZoom,
          minimap: { enabled: false },
          wordWrap: 'on',
          readOnly: true,
          lineNumbers: (lineNumber) =>
            `> ${consoleTimestamp[lineNumber - 1]} -`,
          lineNumbersMinChars: 16,
        }}
      />
    </Box>
  );
}

// Export
export default Console;
