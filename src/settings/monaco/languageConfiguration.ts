// Import constants
import { KISS_VM_LANGUAGE } from '@/constants';

// Language configuration config
function languageConfiguration(monaco) {
  monaco.languages.setLanguageConfiguration(KISS_VM_LANGUAGE, {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['$[', ']'],
      ['(', ')'],
    ],
    autoClosingPairs: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
      { open: '/*', close: '*/' },
    ],
    comments: {
      blockComment: ['/*', '*/'],
    },
    indentationRules: {
      increaseIndentPattern: /({|\[|\()/,
      decreaseIndentPattern: /(}|\]|\))/,
    },
  });
}

// Export
export default languageConfiguration;
