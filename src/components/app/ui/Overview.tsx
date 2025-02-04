// Import dependencies
import {
  Box,
  Button,
  Card,
  Code,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useContext } from 'react';
// Import context
import { appContext } from '../../AppContext';
// Import utilities
import getIcon from '../../utils/getIcon';
import getType from '../../utils/getType';

// Types
type OverviewItemProps = {
  children?: React.ReactNode;
  label: string;
  placeholder: string;
  h?: string | number;
};

// Utility components
/* function ScriptStatus({ children, label, bool }) {
  return (
    <HStack gap={1}>
      <Text color="gray.500" textTransform="uppercase">
        {label}
      </Text>

      <Code colorScheme={bool === null ? 'gray' : bool ? 'green' : 'red'}>
        {children}
      </Code>
    </HStack>
  );
} */
function OverviewItem({
  children,
  label,
  placeholder,
  h = 'auto',
}: OverviewItemProps) {
  return (
    <VStack as="section" w="100%" gap={1}>
      <HStack as="header" w="100%" justifyContent="space-between">
        <Text as="h3" textTransform="uppercase" color="gray.500">
          {label}
        </Text>

        <Button
          size="xs"
          color="gray.500"
          border="1px solid"
          borderColor="gray.500"
          bg="transparent"
          _hover={{ bg: 'gray.500', color: 'gray.900' }}
          textTransform="uppercase"
        >
          Copy
        </Button>
      </HStack>

      <Card w="100%" bg="gray.800" color="gray.50" p={2}>
        <Text as="pre" h={h} overflow="auto" whiteSpace="pre-wrap" pr={2}>
          {children || (
            <Text as="span" color="gray.500">
              {placeholder}
            </Text>
          )}
        </Text>
      </Card>
    </VStack>
  );
}
function VariableItem({ variable, value }) {
  return (
    <Tooltip
      label={`${variable} : ${getType(value)}`}
      placement="left"
      hasArrow
    >
      <ListItem display="grid" gridTemplateColumns="1.5rem 1fr">
        <ListIcon as={getIcon(getType(value))} color="orange.500" my={1.5} />

        <VStack w="100%" gap={0.5}>
          <Text w="100%" wordBreak="break-all">
            {variable}&nbsp;
            <Text as="span" color="orange.500">
              : {getType(value)}
            </Text>
          </Text>

          <Code
            w="100%"
            flexGrow={1}
            colorScheme="orange"
            wordBreak="break-all"
          >
            {value}
          </Code>
        </VStack>
      </ListItem>
    </Tooltip>
  );
}

// Overview component
function Overview() {
  // Define context
  const {
    cleanScript,
    script0xAddress,
    scriptMxAddress,
    // scriptParse,
    // scriptSuccess,
    // scriptMonotonic,
    scriptVariables,
  } = useContext(appContext);

  // Render
  return (
    <Box h="100%" p={2}>
      <VStack as="section" h="100%" pr={2} overflow="auto">
        <Box as="header" w="100%">
          <Text
            as="h2"
            textTransform="uppercase"
            fontSize="lg"
            color="gray.500"
          >
            Overview
          </Text>
        </Box>

        <VStack w="100%" fontSize="sm" gap={3}>
          {/*
           * Moved the script status to the console header
           */}
          {/* <Card bg="gray.800" color="gray.50" px={3}>
            <HStack py={2} gap={3} flexWrap="wrap" justifyContent="center">
              <ScriptStatus label="Parse" bool={scriptParse}>
                {scriptParse === null ? 'N/A' : scriptParse ? 'OK' : 'FAIL'}
              </ScriptStatus>

              <ScriptStatus label="Run" bool={scriptSuccess}>
                {scriptSuccess === null ? 'N/A' : scriptSuccess ? 'OK' : 'FAIL'}
              </ScriptStatus>

              <ScriptStatus label="Monotonic" bool={scriptMonotonic}>
                {scriptMonotonic === null
                  ? 'N/A'
                  : scriptMonotonic
                  ? 'YES'
                  : 'NO'}
              </ScriptStatus>
            </HStack>
          </Card> */}

          <OverviewItem
            label="Clean script"
            placeholder="Clean script here"
            h={32}
          >
            {cleanScript}
          </OverviewItem>

          <OverviewItem label="0x Address" placeholder="Script 0xAddress here">
            {script0xAddress}
          </OverviewItem>

          <OverviewItem label="Mx Address" placeholder="Script MxAddress here">
            {scriptMxAddress}
          </OverviewItem>

          <VStack as="section" w="100%" gap={1}>
            <Box as="header" w="100%">
              <Text as="h3" textTransform="uppercase" color="gray.500">
                Script variables
              </Text>
            </Box>

            <Card w="100%" bg="gray.800" color="gray.50" p={2}>
              {Object.entries(scriptVariables).length > 0 ? (
                <List spacing={3}>
                  {Object.entries(scriptVariables).map(([variable, value]) => (
                    <VariableItem
                      key={variable}
                      variable={variable}
                      value={value}
                    />
                  ))}
                </List>
              ) : (
                <Text as="pre" color="gray.500" whiteSpace="pre-wrap">
                  Script variables here
                </Text>
              )}
            </Card>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}

// Export
export default Overview;
