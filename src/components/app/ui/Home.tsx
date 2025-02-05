import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuBadgeAlert, LuBadgeInfo } from 'react-icons/lu';

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

function Home() {
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

      <Accordion w="100%" allowToggle>
        <AccordionItem border="none">
          <Text as="h4">
            <AccordionButton>
              <Text as="span" flex="1" textAlign="left">
                Changelog
              </Text>

              <AccordionIcon />
            </AccordionButton>
          </Text>

          <AccordionPanel>
            <List spacing={3} fontSize="sm" textAlign="start">
              <FeatureItem>
                [v3.0.2] - 5 Fed 2025 <br />
                Write, run and debug KISS VM scripts with a updated UI.
              </FeatureItem>

              <FeatureItem>
                [v3.0.2] - 5 Fed 2025 <br />
                Share and inspect clean script, 0xaddress, mxaddress and script
                variables.
              </FeatureItem>

              <FeatureItem>
                [v3.0.2] - 5 Fed 2025 <br />
                Add and test state, prevstate and global variables.
              </FeatureItem>

              <FeatureItem>
                [v3.0.2] - 5 Fed 2025 <br />
                Add and test signatures.
              </FeatureItem>

              <FeatureItem alert>
                [v3.0.2] - 5 Fed 2025 <br />
                State, prevstate and global variables and signatures are not
                saved between sessions.
              </FeatureItem>

              <FeatureItem>
                [v3.0.2] - 5 Fed 2025 <br />
                Add and test extra scripts (experimental script insert).
              </FeatureItem>

              <FeatureItem alert>
                [v3.0.2] - 5 Fed 2025 <br />
                Extra scripts are stored to the browsers local storage, so they
                will be lost if the cache is cleared.
              </FeatureItem>

              <FeatureItem alert>
                [v3.0.2] - 5 Fed 2025 <br />
                Functions that relay on the txn input and output don't work.
              </FeatureItem>

              <FeatureItem alert>
                [v3.0.2] - 5 Fed 2025 <br />
                The dapp has missing loading states, so the feedback may feel a
                bit off during some operations.
              </FeatureItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <VStack w="100%" gap={3} py={4}></VStack>
    </VStack>
  );
}

export default Home;
