// Import dependencies
import { Box, Button, HStack, Tooltip } from '@chakra-ui/react';
import { LuBan, LuChevronsDown, LuChevronsUp } from 'react-icons/lu';
// Import store
import useConsoleStore from '@/store/useConsoleStore';

// Console header component
function ConsoleHeader({ isConsoleCollapsed, handelToggleConsole }) {
  // Define store
  const clearConsoleOut = useConsoleStore((state) => state.clearConsoleOut);

  // Render
  return (
    <HStack gap={0} justify="space-between">
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
              onClick={clearConsoleOut}
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
