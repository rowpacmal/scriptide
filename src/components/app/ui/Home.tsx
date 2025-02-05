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
import { LuThumbsDown, LuThumbsUp } from 'react-icons/lu';

function FeatureItem({ children, isMissing = false }) {
  return (
    <ListItem>
      <ListIcon
        as={isMissing ? LuThumbsDown : LuThumbsUp}
        color={isMissing ? 'red.500' : 'green.500'}
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

      <Accordion w="100%" defaultIndex={[0]} allowToggle>
        <AccordionItem border="none">
          <Text as="h4">
            <AccordionButton>
              <Text as="span" flex="1" textAlign="left">
                Current IDE Features
              </Text>

              <AccordionIcon />
            </AccordionButton>
          </Text>

          <AccordionPanel>
            <List spacing={3} fontSize="sm" textAlign="start">
              <FeatureItem>Write, run and debug KISS VM scripts.</FeatureItem>

              <FeatureItem>
                Share and inspect clean script, 0xaddress, mxaddress and script
                variables.
              </FeatureItem>

              <FeatureItem>
                Add and test state, prevstate and global variables.
              </FeatureItem>

              <FeatureItem>Add and test signatures.</FeatureItem>

              <FeatureItem>
                Add and test extra scripts (experimental script insert)
              </FeatureItem>

              <Divider borderColor="gray.700" />

              <FeatureItem isMissing>
                Functions that relay on the txn input and output don't work.
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
