import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Code,
  Divider,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuBadgeAlert, LuBadgeInfo, LuScrollText } from 'react-icons/lu';

function FeatureItem({ children, alert = false }) {
  return (
    <ListItem>
      <ListIcon
        as={alert ? LuBadgeAlert : LuBadgeInfo}
        color={alert ? 'yellow.500' : 'green.500'}
      />
      {children}
    </ListItem>
  );
}

function ChangelogItem({ children, version, date }) {
  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem border="none">
        <Text as="h4">
          <AccordionButton justifyContent="space-between">
            <HStack>
              <LuScrollText />

              <Text as="span" flex="1" textAlign="left">
                [{version}] - {date}
              </Text>
            </HStack>

            <AccordionIcon />
          </AccordionButton>
        </Text>

        <AccordionPanel pb={2}>
          <List spacing={3} fontSize="sm" textAlign="start">
            {children}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function HomePanel() {
  return (
    <VStack w="100%" color="gray.500" textAlign="center">
      <Box maxW="160px">
        <Image src="./scriptide.png" alt="Script IDE Logo" w="auto" h="auto" />
      </Box>

      <Text as="h3" w="100%" fontSize="lg">
        Welcome to Minima Script IDE!
      </Text>

      <Divider borderColor="gray.700" />

      <VStack w="100%" gap={3} py={4}>
        <Text w="100%">
          This is a simple IDE for writing and testing Minima scripts - KISS VM.
        </Text>

        <Text w="100%">
          It is a work in progress and will be improved as time goes by. If you
          find any bugs or have any suggestions, please let me know, and please
          be patient as this project is still under development.
        </Text>
      </VStack>

      <Divider borderColor="gray.700" />

      <Text as="h3" w="100%" fontSize="lg">
        Changelog
      </Text>

      <ChangelogItem version="3.0.0" date="January 20, 2025">
        <FeatureItem>
          Laid the foundation for a redesigned Script IDE, including prototyping
          improvements to features and UI.
        </FeatureItem>
      </ChangelogItem>

      <ChangelogItem version="3.0.2" date="February 5, 2025">
        <FeatureItem>
          Updated the write, run, and debug features with a refreshed UI.
        </FeatureItem>

        <FeatureItem>
          Enhanced script output inspection - clean script, 0xaddress,
          mxaddress, total instructions, and script variables.
        </FeatureItem>

        <FeatureItem>
          Improved UX for managing and testing state, prevstate, global
          variables, signatures, and extra scripts (with experimental script
          insertion).
        </FeatureItem>

        <ListItem>
          <ListItem pb={2}>
            <Text as="h4" w="100%" fontSize="md">
              Known Issues (3.0.2):
            </Text>
          </ListItem>

          <List spacing={3} pl={2}>
            <FeatureItem alert>
              State, prevstate, global variables, and signatures are not
              persisted between sessions.
            </FeatureItem>

            <FeatureItem alert>
              Extra scripts are stored in the browser's local storage and will
              be lost if the cache is cleared.
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
              Performance optimizations are still in progress. Some features
              have been temporarily limited for performance reasons (maximum 10
              workspaces, 8 script files, and 10 extra script slots). These
              limitations will be removed as the dapp is further optimized.
            </FeatureItem>
          </List>
        </ListItem>
      </ChangelogItem>

      <ChangelogItem version="3.0.4" date="February 6, 2025">
        <FeatureItem>
          Resolved an issue where the&nbsp;
          <Code bg="gray.800" color="gray.500">
            @ADDRESS
          </Code>
          &nbsp; global variable was not being set correctly.
        </FeatureItem>
      </ChangelogItem>
    </VStack>
  );
}

export default HomePanel;
