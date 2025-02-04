// Import constants
import { KISS_VM_LANGUAGE } from '../../constants';

// Language register config
function diagnostics(monaco) {
  function validateCustomLangModel(model) {
    if (!model || model.getLanguageId() !== KISS_VM_LANGUAGE) return;

    const code = model.getValue();
    const markers = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      if (line.includes('ERROR')) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          startLineNumber: index + 1,
          startColumn: line.indexOf('ERROR') + 1,
          endLineNumber: index + 1,
          endColumn: line.indexOf('ERROR') + 6,
          message: 'Detected ERROR in code.',
          source: 'customLangChecker',
        });
      }
      if (line.includes('WARNING')) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          startLineNumber: index + 2,
          startColumn: line.indexOf('WARNING') + 1,
          endLineNumber: index + 2,
          endColumn: line.indexOf('WARNING') + 8,
          message: 'Detected WARNING.',
          source: 'customLangChecker',
        });
      }
    });

    monaco.editor.setModelMarkers(model, 'customLangChecker', markers);
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
