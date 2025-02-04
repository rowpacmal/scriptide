// Import constants
import { KISS_VM_LANGUAGE } from '../../constants';

// Constants
const LANGUAGE_CHECKER_ID = 'kvm';

// Language register config
function diagnostics(monaco) {
  function validateCustomLangModel(model) {
    if (!model || model.getLanguageId() !== KISS_VM_LANGUAGE) return;

    const code = model.getValue();
    const markers = [];
    const lines = code.split('\n');
    // console.log(lines);

    lines.forEach((line, index) => {
      if (line.includes('ERROR')) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: index + 1,
          startColumn: line.indexOf('ERROR') + 1,
          endLineNumber: index + 1,
          endColumn: line.indexOf('ERROR') + 6,
          message: 'Detected ERROR in code.',
          source: LANGUAGE_CHECKER_ID,
        });
      }
      if (line.includes('WARNING')) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          startLineNumber: index + 1,
          startColumn: line.indexOf('WARNING') + 1,
          endLineNumber: index + 1,
          endColumn: line.indexOf('WARNING') + 8,
          message: 'Detected WARNING.',
          source: LANGUAGE_CHECKER_ID,
        });
      }

      const code = line.replace(/\s+/g, ' ').trim().split(' ');
      code.forEach((c, cindex) => {
        if (c.includes('LET')) {
          if (/([^a-z]+)/.test(code[cindex + 1])) {
            // console.log(code[cindex + 1]);

            markers.push({
              severity: monaco.MarkerSeverity.ERROR,
              startLineNumber: index + 1,
              startColumn: line.indexOf(code[cindex + 1]) + 1,
              endLineNumber: index + 1,
              endColumn:
                line.indexOf(code[cindex + 1]) + code[cindex + 1].length + 1,
              message: 'Variable names must only consist of lowercase letters.',
              source: LANGUAGE_CHECKER_ID,
            });
          }
        }
      });
    });

    monaco.editor.setModelMarkers(model, LANGUAGE_CHECKER_ID, markers);
  }

  monaco.editor.onDidCreateModel((model) => {
    if (model.getLanguageId() === KISS_VM_LANGUAGE) {
      validateCustomLangModel(model);

      model.onDidChangeContent(() => {
        validateCustomLangModel(model);
      });
    }
  });
}

// Export
export default diagnostics;
