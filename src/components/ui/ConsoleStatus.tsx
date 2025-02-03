import {
  Box,
  Button,
  Code,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { LuCircleDotDashed } from 'react-icons/lu';
import { appContext } from '../../AppContext';
import { useContext } from 'react';

// Utility functions
function getColor(status1, status2) {
  if (status1 === null || status2 === null) {
    return '';
  }

  if (!status1 && !status2) {
    return 'red.500';
  } else if (!status1 || !status2) {
    return 'yellow.500';
  } else {
    return 'green.500';
  }
}

// Console status component
function ConsoleStatus() {
  // Define context
  const { scriptParse, scriptSuccess, scriptMonotonic } =
    useContext(appContext);

  // Render
  return (
    <Box color="gray.500">
      <Popover placement="top" isLazy>
        <PopoverTrigger>
          <Box>
            <Tooltip label="Status" placement="top" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color="gray.500"
                p={0}
                _hover={{ bg: 'transparent', color: 'gray.50' }}
                _active={{
                  bg: 'transparent',
                }}
              >
                <Box color={getColor(scriptParse, scriptSuccess)}>
                  <LuCircleDotDashed />
                </Box>
              </Button>
            </Tooltip>
          </Box>
        </PopoverTrigger>

        <PopoverContent bg="gray.800" borderColor="gray.700">
          <PopoverArrow bg="gray.800" shadowColor="gray.700" />

          <PopoverCloseButton />

          <PopoverHeader borderColor="gray.700">Status</PopoverHeader>

          <PopoverBody>
            <HStack w="100%" fontSize="sm" justify="space-evenly">
              <HStack w="100%" justify="center">
                <Text textTransform="uppercase">Parse</Text>

                <Code
                  colorScheme={
                    scriptParse === null
                      ? 'gray'
                      : scriptParse
                      ? 'green'
                      : 'red'
                  }
                >
                  {scriptParse === null ? 'N/A' : scriptParse ? 'OK' : 'FAIL'}
                </Code>
              </HStack>

              <HStack w="100%" justify="center">
                <Text textTransform="uppercase">Run</Text>

                <Code
                  colorScheme={
                    scriptSuccess === null
                      ? 'gray'
                      : scriptSuccess
                      ? 'green'
                      : 'red'
                  }
                >
                  {scriptSuccess === null
                    ? 'N/A'
                    : scriptSuccess
                    ? 'OK'
                    : 'FAIL'}
                </Code>
              </HStack>

              <HStack w="100%" justify="center">
                <Text textTransform="uppercase">Monotonic</Text>

                <Code
                  colorScheme={
                    scriptMonotonic === null
                      ? 'gray'
                      : scriptMonotonic
                      ? 'blue'
                      : 'purple'
                  }
                >
                  {scriptMonotonic === null
                    ? 'N/A'
                    : scriptMonotonic
                    ? 'YES'
                    : 'NO'}
                </Code>
              </HStack>
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

// Export
export default ConsoleStatus;
