// Dependencies
import useAppTheme from '@/themes/useAppTheme';
import { HStack, Text } from '@chakra-ui/react';

// App header component
function Header() {
  const { borderColor, colorAlt } = useAppTheme();

  // Render
  return (
    <HStack
      as="header"
      h="1.5rem"
      borderBottom="1px solid"
      borderColor={borderColor}
      px={2}
      justify="center"
    >
      <Text
        as="h1"
        color={colorAlt}
        fontWeight="medium"
        textTransform="uppercase"
        userSelect="none"
      >
        Minima Script IDE
      </Text>
    </HStack>
  );
}

// Export
export default Header;
