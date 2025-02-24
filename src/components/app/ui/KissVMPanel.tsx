import { Divider, Text, VStack } from '@chakra-ui/react';
import States from './States';
import Globals from './Globals';
import Signatures from './Signatures';
import useAppTheme from '@/themes/useAppTheme';
import Overview from './Overview';

function KissVMPanel() {
  // Define theme
  const { colorAlt, borderColor } = useAppTheme();

  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <Overview />

      <Divider borderColor={borderColor} />

      <States />

      <Divider borderColor={borderColor} />

      <VStack w="100%" gap={0}>
        <Text
          w="100%"
          as="h3"
          textTransform="uppercase"
          color={colorAlt}
          fontSize="xs"
        >
          Globals
        </Text>

        <Globals />
      </VStack>

      <Divider borderColor={borderColor} />

      <Signatures />
    </VStack>
  );
}

export default KissVMPanel;
