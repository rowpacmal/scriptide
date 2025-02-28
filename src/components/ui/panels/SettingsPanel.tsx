// Dependencies
import useAppTheme from '@/themes/useAppTheme';
import {
  Box,
  HStack,
  Select,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';

function SettingsPanel() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { accent, bgAlt, borderColor, color, colorAlt } = useAppTheme();

  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={3}>
      <VStack w="100%" gap={1}>
        <Text
          as="h3"
          w="100%"
          textTransform="uppercase"
          fontSize="xs"
          color={colorAlt}
        >
          Appearance
        </Text>

        <HStack w="100%" gap={2} justify="space-between" flexWrap="wrap">
          <Text as="h4" color={colorAlt}>
            Color mode
          </Text>

          <Box>
            <Select
              size="xs"
              value={colorMode}
              onChange={toggleColorMode}
              borderColor={borderColor}
              _hover={{ borderColor: color }}
              _focusVisible={{ borderColor: accent }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </Select>
          </Box>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default SettingsPanel;
