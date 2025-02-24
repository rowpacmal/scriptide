// Dependencies
import useAppTheme from '@/themes/useAppTheme';
import { Button, Grid, GridItem, Text, useColorMode } from '@chakra-ui/react';
import { LuMoon, LuSun } from 'react-icons/lu';

// App header component
function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { borderColor } = useAppTheme();

  // Render
  return (
    <Grid
      as="header"
      h="2rem"
      borderBottom="1px solid"
      borderColor={borderColor}
      px={2}
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem
        colStart={2}
        colEnd={3}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="h1" fontSize="lg">
          Minima Script IDE
        </Text>
      </GridItem>

      <GridItem
        colStart={3}
        colEnd={4}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Button size="xs" variant="ghost" onClick={toggleColorMode}>
          {colorMode === 'light' ? <LuSun /> : <LuMoon />}
        </Button>
      </GridItem>
    </Grid>
  );
}

// Export
export default Header;
