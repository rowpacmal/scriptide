import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import useEditorStore from '@/stores/useEditorStore';
import useConsoleStore from '@/stores/useConsoleStore';
import useAppTheme from '@/themes/useAppTheme';
import { mds } from '@/lib/minima';

// Console component
function Console() {
  // Define refs
  const consoleOutputRef = useRef(null);

  // Define theme
  const { borderColor, editorTheme } = useAppTheme();

  // Define store
  const editorZoom = useEditorStore((state) => state.editorZoom);
  const consoleOutput = useConsoleStore((state) => state.consoleOutput);
  const setConsoleOutput = useConsoleStore((state) => state.setConsoleOutput);
  const extendConsoleOut = useConsoleStore((state) => state.extendConsoleOut);

  // Define states
  const [userInput, setUserInput] = useState('');

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
    <Box
      h="100%"
      borderTop="1px solid"
      borderColor={borderColor}
      onKeyDown={async (e) => {
        if (userInput && e.key === 'Enter') {
          const result = await new Promise((resolve) => {
            mds.cmd(userInput.trim(), (msg: any) => {
              resolve(msg);
            });
          });

          if (!userInput.endsWith('\n')) {
            setConsoleOutput(consoleOutput + '\n');
          }

          extendConsoleOut(
            '>> response start << \n' +
              JSON.stringify(result, null, 2) +
              '\n>> response end <<'
          );
          setUserInput('');
        }
      }}
    >
      <Editor
        onValidate={(e) => console.log(e)}
        height="100%"
        theme={editorTheme}
        language="shell"
        onMount={handleOnMount}
        value={consoleOutput}
        onChange={async (value) => {
          setConsoleOutput(value || '');
          setUserInput(value?.split('\n').pop() || '');
        }}
        options={{
          fontSize: 12 + editorZoom,
          minimap: { enabled: false },
          wordWrap: 'on',
          // readOnly: true,
          // lineNumbers: (lineNumber) =>
          //   consoleTimestamp[lineNumber - 1]
          //     ? `> [${consoleTimestamp[lineNumber - 1]}] -`
          //     : '',
          lineNumbers: () => '>',
          lineNumbersMinChars: 3,
          // lineNumbersMinChars: 20,
        }}
      />
    </Box>
  );
}

// Export
export default Console;
