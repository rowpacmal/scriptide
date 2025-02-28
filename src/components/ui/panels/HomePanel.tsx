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
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuBadgeAlert, LuBadgeInfo, LuScrollText } from 'react-icons/lu';
import AppLogo from '../systems/AppLogo';
import useAppTheme from '@/themes/useAppTheme';

function FeatureItem({ children, alert = false }) {
  // Define theme
  const { colorSuccess, colorWarning } = useAppTheme();

  return (
    <ListItem>
      <ListIcon
        as={alert ? LuBadgeAlert : LuBadgeInfo}
        color={alert ? colorWarning : colorSuccess}
      />
      {children}
    </ListItem>
  );
}

function ChangelogItem({ children, version, date }) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  return (
    <Accordion w="100%" allowToggle>
      <AccordionItem border="none">
        <Text as="h4">
          <AccordionButton
            px={2}
            py={1}
            color={colorAlt}
            _hover={{ color }}
            justifyContent="space-between"
          >
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
          <List spacing={2} fontSize="sm" textAlign="start">
            {children}
          </List>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function HomePanel() {
  // Define theme
  const { bgReversed, borderColor, colorAlt, colorReversed } = useAppTheme();

  return (
    <VStack w="100%" pb={4} color={colorAlt} textAlign="center">
      <Box maxW="200px" p={4}>
        <AppLogo size="100%" />
      </Box>

      <Text as="h3" w="100%" fontSize="lg">
        Welcome to Minima Script IDE!
      </Text>

      <Divider borderColor={borderColor} />

      <VStack w="100%" gap={3} py={4}>
        <Text w="100%">
          This is an IDE for writing and testing Minima scripts (KISS VM) or
          create simple MiniDapps.
        </Text>

        <Text w="100%">
          It is a work in progress and will be improved as time goes by. If you
          find any bugs or have any suggestions, please let me know, and please
          be patient as this project is still under development.
        </Text>
      </VStack>

      <Divider borderColor={borderColor} />

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

        <List spacing={2}>
          <ListItem>
            <Text as="h4" w="100%" fontSize="md">
              Known Issues (3.0.2):
            </Text>
          </ListItem>

          <List spacing={2} pl={2}>
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
        </List>
      </ChangelogItem>

      <ChangelogItem version="3.0.4" date="February 6, 2025">
        <FeatureItem>
          Resolved an issue where the&nbsp;
          <Code bg={bgReversed} color={colorReversed}>
            @ADDRESS
          </Code>
          &nbsp; global variable was not being set correctly.
        </FeatureItem>
      </ChangelogItem>
    </VStack>
  );
}

export default HomePanel;
