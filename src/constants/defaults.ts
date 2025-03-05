const DAPP_CONFIG = {
  name: 'Name',
  icon: 'icon.png',
  version: '0.0.0',
  description: 'Description',
  browser: 'internal',
  category: 'Category',
};

const EDITOR_THEMES = {
  dark: 'minima-dark',
  light: 'minima-light',
};

const ICON_SIZES = {
  xs: '16px',
  sm: '20px',
  md: '24px',
  lg: '32px',
};

const INPUT_PLACEHOLDERS = {
  zip: 'Enter zip name here',
  workspace: 'Enter workspace name here',
  confirm: 'Enter confirm text here',
  value: 'Enter value here',
};

const LOCAL_STORAGE_KEYS = {
  globalsAccordionIndex: 'globals-accordion-index',
  settingsPanelAccordionIndex: 'settings-panel-accordion-index',
  deployBuildPanelAccordionIndex: 'deploy-build-panel-accordion-index',
  kissVMPanelAccordionIndex: 'kiss-vm-panel-accordion-index',
  fileExplorerExpanded: 'file-explorer-expanded',
  storedWorkspace: 'stored-workspace',
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
  DAPP_CONFIG,
  EDITOR_THEMES,
  ICON_SIZES,
  INPUT_PLACEHOLDERS,
  LOCAL_STORAGE_KEYS,
  NAVIGATION_LABELS,
};
