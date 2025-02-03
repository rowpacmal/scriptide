// Import constants
import { DEFAULT_EDITOR_THEME } from '../../constants';

// Constants
const DEFAULT_THEME_COLORS = {
  comment: '718096',
  type: 'D53F8C',
  keyword: '3182ce',
  string: '38A169',
  operator: 'F56565',
  function: '9F7AEA',
  identifier: 'F7FAFC',
  background: '#171923',
  lineHighlight: '#1A202C',
};

// Editor theme config
function minimaTheme(monaco) {
  // Define editor theme
  monaco.editor.defineTheme(DEFAULT_EDITOR_THEME, {
    base: 'vs-dark',
    inherit: true,
    rules: [
      {
        token: 'comment',
        foreground: DEFAULT_THEME_COLORS.comment,
        fontStyle: 'italic',
      },
      { token: 'type', foreground: DEFAULT_THEME_COLORS.type },
      { token: 'placeholder', foreground: DEFAULT_THEME_COLORS.type },
      {
        token: 'keyword',
        foreground: DEFAULT_THEME_COLORS.keyword,
      },
      { token: 'relation', foreground: DEFAULT_THEME_COLORS.keyword },
      { token: 'logic', foreground: DEFAULT_THEME_COLORS.keyword },
      { token: 'global', foreground: DEFAULT_THEME_COLORS.keyword },
      { token: 'function', foreground: DEFAULT_THEME_COLORS.function },
      { token: 'boolean', foreground: DEFAULT_THEME_COLORS.function },
      { token: 'hex', foreground: DEFAULT_THEME_COLORS.function },
      { token: 'number', foreground: DEFAULT_THEME_COLORS.function },
      { token: 'string', foreground: DEFAULT_THEME_COLORS.string },
      { token: 'script', foreground: DEFAULT_THEME_COLORS.string },
      { token: 'operator', foreground: DEFAULT_THEME_COLORS.operator },
      { token: 'identifier', foreground: DEFAULT_THEME_COLORS.identifier },
    ],
    colors: {
      'editor.background': DEFAULT_THEME_COLORS.background,
      'editor.lineHighlightBackground': DEFAULT_THEME_COLORS.lineHighlight,
    },
  });

  // Apply the themes
  monaco.editor.setTheme(DEFAULT_EDITOR_THEME);
}

// Export
export default minimaTheme;
