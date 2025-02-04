// Import dependencies
import { Box, Button, HStack, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';
import { LuBan, LuChevronsDown, LuChevronsUp } from 'react-icons/lu';
// Import constants
import { CONSOLE_DEFAULT_CLEARED } from '../../../constants';
// Import context
import { appContext } from '../../../AppContext';
// Import components
import ConsoleStatus from './ConsoleStatus';

// Console header component
function ConsoleHeader({ isConsoleCollapsed, handelToggleConsole }) {
  // Define context
  const { setConsoleOutput, setConsoleTimestamp } = useContext(appContext);

  // Define functions
  function handleClearConsole() {
    setConsoleOutput(CONSOLE_DEFAULT_CLEARED.console);
    setConsoleTimestamp(CONSOLE_DEFAULT_CLEARED.timestamp);
  }

  // Render
  return (
    <HStack gap={0} justify="space-between">
      <HStack gap={0}>
        <Box>
          <Tooltip
            label={isConsoleCollapsed ? 'Show console' : 'Hide console'}
            placement="top"
            hasArrow
          >
            <Button
              size="sm"
              bg="transparent"
              color="gray.500"
              p={0}
              _hover={{ bg: 'transparent', color: 'gray.50' }}
              _active={{
                bg: 'transparent',
              }}
              onClick={handelToggleConsole}
            >
              {isConsoleCollapsed ? <LuChevronsUp /> : <LuChevronsDown />}
            </Button>
          </Tooltip>
        </Box>

        <ConsoleStatus />
      </HStack>

      <HStack gap={0}>
        <Box>
          <Tooltip label="Clear console" placement="top" hasArrow>
            <Button
              size="sm"
              bg="transparent"
              color="gray.500"
              p={0}
              _hover={{ bg: 'transparent', color: 'red.500' }}
              _active={{
                bg: 'transparent',
              }}
              onClick={handleClearConsole}
            >
              <LuBan />
            </Button>
          </Tooltip>
        </Box>
      </HStack>
    </HStack>
  );
}

// Export
export default ConsoleHeader;
