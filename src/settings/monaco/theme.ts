// Import constants
import { DEFAULT_EDITOR_THEME } from '../../constants';
// import darkTheme from '../../themes/editor/dark';

// Constants
const DEFAULT_THEME_COLORS = {
  // Tokens
  comment: '718096',
  type: 'D53F8C',
  keyword: '3182ce',
  string: '38A169',
  operator: 'F56565',
  function: '9F7AEA',
  identifier: 'F7FAFC',

  // Editor
  foreground: '#718096',
  background: '#171923',
  gutter: '#1A202C',
  border: '#2D3748',
  lineHighlight: '#4A5568',
  whitespace: '#718096',
  cursor: '#DD6B20',
  added: '#38A169',
  deleted: '#E53E3E',
  modified: '#3182ce',
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
      'editor.foreground': DEFAULT_THEME_COLORS.foreground,
      'editor.background': DEFAULT_THEME_COLORS.background,
      'editor.lineHighlightBackground': DEFAULT_THEME_COLORS.gutter,
      'editor.selectionBackground': DEFAULT_THEME_COLORS.lineHighlight,
      'editor.selectionHighlightBackground': DEFAULT_THEME_COLORS.gutter,
      'editor.findMatchBackground': DEFAULT_THEME_COLORS.lineHighlight,
      'editor.findMatchHighlightBackground': DEFAULT_THEME_COLORS.gutter,
      'editor.findRangeHighlightBackground': DEFAULT_THEME_COLORS.gutter,
      'editorBracketMatch.background': DEFAULT_THEME_COLORS.lineHighlight,
      'editorBracketMatch.border': DEFAULT_THEME_COLORS.whitespace,
      'editorCursor.foreground': DEFAULT_THEME_COLORS.foreground,
      'editorGutter.foreground': DEFAULT_THEME_COLORS.cursor,
      'editorGutter.background': DEFAULT_THEME_COLORS.background,
      'editorGutter.border': DEFAULT_THEME_COLORS.foreground,
      'editorGutter.addedBackground': DEFAULT_THEME_COLORS.added,
      'editorGutter.deletedBackground': DEFAULT_THEME_COLORS.deleted,
      'editorGutter.modifiedBackground': DEFAULT_THEME_COLORS.modified,
      'editorHoverWidget.background': DEFAULT_THEME_COLORS.gutter,
      'editorHoverWidget.border': DEFAULT_THEME_COLORS.border,
      'editorLink.activeForeground': DEFAULT_THEME_COLORS.foreground,
      'editorWhitespace.foreground': DEFAULT_THEME_COLORS.whitespace,
      'editorWidget.background': DEFAULT_THEME_COLORS.gutter,
      'editorWidget.border': DEFAULT_THEME_COLORS.border,
    },
    // color: darkTheme,
  });

  // Apply the themes
  monaco.editor.setTheme(DEFAULT_EDITOR_THEME);
}

// Export
export default minimaTheme;
