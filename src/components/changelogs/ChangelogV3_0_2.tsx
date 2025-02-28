import { List, ListItem, Text } from '@chakra-ui/react';
import { ChangelogItem, FeatureItem } from './ChangelogBase';

function ChangelogV3_0_2() {
  return (
    <ChangelogItem version="3.0.2" date="February 5, 2025">
      <FeatureItem>
        Updated the write, run, and debug features with a refreshed UI.
      </FeatureItem>

      <FeatureItem>
        Enhanced script output inspection - clean script, 0xaddress, mxaddress,
        total instructions, and script variables.
      </FeatureItem>

      <FeatureItem>
        Improved UX for managing and testing state, prevstate, global variables,
        signatures, and extra scripts (with experimental script insertion).
      </FeatureItem>

      <List spacing={2}>
        <ListItem>
          <Text as="h4" w="100%" fontSize="md">
            Known Issues (3.0.2):
          </Text>
        </ListItem>

        <List spacing={2} pl={2}>
          <FeatureItem alert>
            State, prevstate, global variables, and signatures are not persisted
            between sessions.
          </FeatureItem>

          <FeatureItem alert>
            Extra scripts are stored in the browser's local storage and will be
            lost if the cache is cleared.
          </FeatureItem>

          <FeatureItem alert>
            Functions relying on txn input and output are currently
            non-functional.
          </FeatureItem>

          <FeatureItem alert>
            The dapp lacks loading states, potentially leading to a suboptimal
            user experience during certain operations.
          </FeatureItem>

          <FeatureItem alert>
            Performance optimizations are still in progress. Some features have
            been temporarily limited for performance reasons (maximum 10
            workspaces, 8 script files, and 10 extra script slots). These
            limitations will be removed as the dapp is further optimized.
          </FeatureItem>
        </List>
      </List>
    </ChangelogItem>
  );
}

export default ChangelogV3_0_2;
