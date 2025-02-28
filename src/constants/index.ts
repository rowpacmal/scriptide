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
  'Allows Minima commands, such as "balance", "keys" and "coins" etc. in this console.',
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

const DEFAULT_DAPP_CONFIG = {
  name: 'Name',
  icon: 'icon.png',
  version: '0.0.0',
  description: 'Description',
  browser: 'internal',
  category: 'Category',
};

const DEFAULT_PLACEHOLDERS = {
  zip: 'Enter zip name here',
  workspace: 'Enter workspace name here',
  confirm: 'Enter confirm text here',
  value: 'Enter value here',
};

const DEFAULT_LOCAL_STORAGE_KEYS = {
  globalsAccordionIndex: 'globals-accordion-index',
  settingsPanelAccordionIndex: 'settings-panel-accordion-index',
  deployBuildPanelAccordionIndex: 'deploy-build-panel-accordion-index',
  kissVMPanelAccordionIndex: 'kiss-vm-panel-accordion-index',
  fileExplorerExpanded: 'file-explorer-expanded',
  storedWorkspace: 'stored-workspace',
};

export {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_CLEARED,
  GLOBALS_DEFAULT_OBJECT,
  NAVIGATION_LABELS,
  KISS_VM_LANGUAGE,
  DEFAULT_EDITOR_THEME_DARK,
  DEFAULT_EDITOR_THEME_LIGHT,
  DEFAULT_DAPP_CONFIG,
  DEFAULT_PLACEHOLDERS,
  DEFAULT_LOCAL_STORAGE_KEYS,
};
