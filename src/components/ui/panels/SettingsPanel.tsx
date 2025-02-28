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
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import { LuPalette } from 'react-icons/lu';

function SettingsPanel() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { accent, borderColor, color, colorAlt } = useAppTheme();

  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={3}>
      <AccordionBase>
        <AccordionItemBase
          title="Appearance"
          icon={<LuPalette />}
          isTop
          isBottom
        >
          <HStack w="100%" gap={2} justify="space-between" flexWrap="wrap">
            <Text
              as="h4"
              textTransform="uppercase"
              fontSize="xs"
              color={colorAlt}
            >
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
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

export default SettingsPanel;
