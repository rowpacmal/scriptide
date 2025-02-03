const CONSOLE_DEFAULT = [
  'Welcome to Minima Script IDE!',
  'Lowercase, newlines, tabs and comments using /* .. */ are supported. Removed and cleaned.',
  '---------------------------------',
];

const CONSOLE_DEFAULT_CLEARED = {
  console: ['Console Cleared', '---------------------------------'],
  timestamp: [new Date().toLocaleTimeString(), new Date().toLocaleTimeString()],
};

const CONSOLE_DEFAULT_TIMESTAMP = [
  new Date().toLocaleTimeString(),
  new Date().toLocaleTimeString(),
  new Date().toLocaleTimeString(),
];

const GLOBALS_DEFAULT_OBJECT = {
  '@BLOCK': '',
  '@ADDRESS': '', // This is read only field
  '@CREATED': '',
  '@COINID': '',
  '@COINAGE': '',
  '@TOKENID': '',
  '@AMOUNT': '',
  '@INPUT': '',
  '@TOTIN': '',
  '@TOTOUT': '',
};

const NAVIGATION_LABELS = {
  home: 'Home',
  explorer: 'File explorer',
  search: 'Search in files',
  states: 'State Variables',
  globals: 'Global Variables',
  signatures: 'Signatures',
  scripts: 'Extra scripts',
  plugins: 'Plugin manager',
  settings: 'Settings',
};

export {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_CLEARED,
  CONSOLE_DEFAULT_TIMESTAMP,
  GLOBALS_DEFAULT_OBJECT,
  NAVIGATION_LABELS,
};
