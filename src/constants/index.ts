const CONSOLE_DEFAULT = [
  '>> welcome start <<',
  '',
  ` $$$$$$\\                      $$\\            $$\\           $$$$$$\\ $$$$$$$\\  $$$$$$$$\\ 
$$  __$$\\                     \\__|           $$ |          \\_$$  _|$$  __$$\\ $$  _____|
$$ /  \\__| $$$$$$$\\  $$$$$$\\  $$\\  $$$$$$\\ $$$$$$\\           $$ |  $$ |  $$ |$$ |      
\\$$$$$$\\  $$  _____|$$  __$$\\ $$ |$$  __$$\\\\_$$  _|          $$ |  $$ |  $$ |$$$$$\\    
 \\____$$\\ $$ /      $$ |  \\__|$$ |$$ /  $$ | $$ |            $$ |  $$ |  $$ |$$  __|   
$$\\   $$ |$$ |      $$ |      $$ |$$ |  $$ | $$ |$$\\         $$ |  $$ |  $$ |$$ |      
\\$$$$$$  |\\$$$$$$$\\ $$ |      $$ |$$$$$$$  | \\$$$$  |      $$$$$$\\ $$$$$$$  |$$$$$$$$\\ 
 \\______/  \\_______|\\__|      \\__|$$  ____/   \\____/       \\______|\\_______/ \\________|
                                  $$ |                                                 
                                  $$ |                                                 
                                  \\__|                                                 `,
  '',
  'Welcome to Minima Script IDE!',
  '-----------------------------',
  'Newlines, tabs and comments using /* .. */ are supported. Removed and cleaned during Run.',
  'Allows Minima commands, such as "balance", "keys" and "coins" in this console.',
  '>> welcome end <<',
  '',
];

const CONSOLE_DEFAULT_CLEARED = [
  '>> clear start <<',
  'Console Cleared',
  '>> clear end <<',
  '',
];

const GLOBALS_DEFAULT_OBJECT = {
  '@ADDRESS': null, // This is read only field
  '@BLOCK': '',
  '@BLOCKMILLI': '',
  '@CREATED': '',
  '@COINAGE': '',
  '@COINID': '',
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
  kissVM: 'Run and debug KISS VM',
  deployBuild: 'Build and deploy',
  plugins: 'Plugin manager',
  settings: 'Settings',
};

const KISS_VM_LANGUAGE = 'kiss-vm';

const DEFAULT_EDITOR_THEME_DARK = 'minima-dark';
const DEFAULT_EDITOR_THEME_LIGHT = 'minima-light';

export {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_CLEARED,
  GLOBALS_DEFAULT_OBJECT,
  NAVIGATION_LABELS,
  KISS_VM_LANGUAGE,
  DEFAULT_EDITOR_THEME_DARK,
  DEFAULT_EDITOR_THEME_LIGHT,
};
