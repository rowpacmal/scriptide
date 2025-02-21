import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import useEditorStore from '@/store/useEditorStore';
import useConsoleStore from '@/store/useConsoleStore';
import useAppTheme from '@/themes/useAppTheme';

// Console component
function Console() {
  // Define refs
  const consoleOutputRef = useRef(null);

  // Define theme
  const { borderColor, editorTheme } = useAppTheme();

  // Define store
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const consoleOutput = useConsoleStore((state) => state.consoleOutput);
  const consoleTimestamp = useConsoleStore((state) => state.consoleTimestamp);

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
    <Box h="100%" borderTop="1px solid" borderColor={borderColor}>
      <Editor
        height="100%"
        theme={editorTheme}
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
