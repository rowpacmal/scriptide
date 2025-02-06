# Changelog

##### [3.0.0] - January 20, 2025

- Laid the foundation for a redesigned Script IDE, including prototyping improvements to features and UI.

##### [3.0.2] - February 5, 2025

- Updated the write, run, and debug features with a refreshed UI.
- Enhanced script output inspection - clean script, 0xaddress, mxaddress, total instructions, and script variables.
- Improved UX for managing and testing state, prevstate, global variables, signatures, and extra scripts (with experimental script insertion).

###### Known Issues (3.0.2):

- State, prevstate, global variables, and signatures are not persisted between sessions.
- Extra scripts are stored in the browser's local storage and will be lost if the cache is cleared.
- Functions relying on txn input and output are currently non-functional.
- The dapp lacks loading states, potentially leading to a suboptimal user experience during certain operations.
- Performance optimizations are still in progress. Some features have been temporarily limited for performance reasons (maximum 10 workspaces, 8 script files, and 10 extra script slots). These limitations will be removed as the dapp is further optimized.

##### [3.0.4] - February 6, 2025

- Resolved an issue where the `@ADDRESS` global variable was not being set correctly.
