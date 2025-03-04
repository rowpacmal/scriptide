export * from './changelogs';
export * from './globals';

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

const DEFAULT_DAPP_CONFIG = {
  name: 'Name',
  icon: 'icon.png',
  version: '0.0.0',
  description: 'Description',
  browser: 'internal',
  category: 'Category',
};

const DEFAULT_EDITOR_THEME_DARK = 'minima-dark';
const DEFAULT_EDITOR_THEME_LIGHT = 'minima-light';

const DEFAULT_LOCAL_STORAGE_KEYS = {
  globalsAccordionIndex: 'globals-accordion-index',
  settingsPanelAccordionIndex: 'settings-panel-accordion-index',
  deployBuildPanelAccordionIndex: 'deploy-build-panel-accordion-index',
  kissVMPanelAccordionIndex: 'kiss-vm-panel-accordion-index',
  fileExplorerExpanded: 'file-explorer-expanded',
  storedWorkspace: 'stored-workspace',
};

const DEFAULT_PLACEHOLDERS = {
  zip: 'Enter zip name here',
  workspace: 'Enter workspace name here',
  confirm: 'Enter confirm text here',
  value: 'Enter value here',
};

const ICON_SIZES = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
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

export {
  CONSOLE_DEFAULT,
  CONSOLE_DEFAULT_CLEARED,
  DEFAULT_DAPP_CONFIG,
  DEFAULT_EDITOR_THEME_DARK,
  DEFAULT_EDITOR_THEME_LIGHT,
  DEFAULT_LOCAL_STORAGE_KEYS,
  DEFAULT_PLACEHOLDERS,
  ICON_SIZES,
  NAVIGATION_LABELS,
};
