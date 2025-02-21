// Dependencies
import useAppTheme from '@/themes/useAppTheme';
import { Button, HStack, Text, useColorMode } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

// App header component
function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { borderColor } = useAppTheme();

  // Render
  return (
    <HStack
      as="header"
      h="2rem"
      borderBottom="1px solid"
      borderColor={borderColor}
      justify="space-between"
      px={2}
    >
      <div></div>

      <Text as="h1" fontSize="lg">
        Minima Script IDE
      </Text>

      <Button size="xs" variant="ghost" onClick={toggleColorMode}>
        {colorMode === 'light' ? <LuSun /> : <LuMoon />}
      </Button>
    </HStack>
  );
}

// Export
export default Header;
