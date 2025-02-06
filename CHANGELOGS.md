# Changelog

##### [3.0.0] - 20 Jan - 3 Fed 2025

- Added the groundwork for the revision of Script IDE with prototyping improvements to features and UI.

##### [3.0.2] - 5 Fed 2025

- Updated the write, run and debug features with an updated UI.

- Improved inspection of the output of the script - clean script, 0xaddress,
  mxaddress, total instructions and script variables.

- Improved features to manage and test state, prevstate, global variables, signatures and extra scripts (with experimental script insert).

- [Note] - State, prevstate and global variables and signatures are not
  saved between sessions.

- [Note] - Extra scripts are stored to the browsers local storage, so they
  will be lost if the cache is cleared.

- [Note] - Functions that relay on the txn input and output don't work.

- [Note] - The dapp has missing loading states, so the feedback may feel a
  bit off during some operations.

- [Note] - May experience optimizations and performance issues. Some
  features as been limited for performance reasons, but will be
  lifted when the dapp is more optimized (max 10 workspaces, 8
  script files, and 10 extra script slots).

##### [3.0.4] - 6 Fed 2025

- Fixed an issue where the @ADDRESS global variable was not being
  set correctly.
