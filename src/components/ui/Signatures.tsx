// Import dependencies
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { LuPlus, LuTrash2, LuX } from 'react-icons/lu';
// Import store
import useSignatureStore from '@/stores/useSignatureStore';
import useAppTheme from '@/themes/useAppTheme';
import { DEFAULT_PLACEHOLDER } from '@/constants';

// Signatures component
function Signatures() {
  // Define store
  const signatures = useSignatureStore((state) => state.signatures);
  const setSignatures = useSignatureStore((state) => state.setSignatures);
  const addSignature = useSignatureStore((state) => state.addSignature);
  const updateSignature = useSignatureStore((state) => state.updateSignature);
  const removeSignature = useSignatureStore((state) => state.removeSignature);

  // Define theme
  const { bgAlt, borderColor, color, colorAlt, colorError } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={2}>
      <HStack w="100%" justify="space-between">
        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color={colorAlt}
          _hover={{
            bg: 'transparent',
            color: signatures.length >= 10 ? '' : color,
            transform: signatures.length >= 10 ? '' : 'scale(1.2)',
          }}
          _active={{ bg: 'transparent', color }}
          onClick={addSignature}
          disabled={signatures.length >= 10}
        >
          <LuPlus size={20} />
        </Button>

        <Button
          p={0}
          h="auto"
          minW="auto"
          bg="transparent"
          color={colorAlt}
          _hover={{
            bg: 'transparent',
            color: signatures.length < 1 ? '' : color,
            transform: signatures.length < 1 ? '' : 'scale(1.2)',
          }}
          _active={{ bg: 'transparent', color }}
          onClick={() => setSignatures([])}
          disabled={signatures.length < 1}
        >
          <LuTrash2 size={20} />
        </Button>
      </HStack>

      {signatures.length > 0 ? (
        <>
          {signatures.map((_, index) => (
            <HStack key={index} w="100%">
              <InputGroup size="sm">
                <InputLeftAddon bg={bgAlt} borderColor={borderColor}>
                  <Text color={colorAlt} whiteSpace="nowrap">
                    {index}
                  </Text>
                </InputLeftAddon>

                <Input
                  variant="outline"
                  borderColor={borderColor}
                  _placeholder={{ color: borderColor }}
                  _readOnly={{ color: colorAlt }}
                  value={signatures[index]}
                  onChange={(e) => updateSignature(index, e.target.value)}
                  placeholder={DEFAULT_PLACEHOLDER.value}
                />

                <InputRightAddon
                  bg={bgAlt}
                  borderColor={borderColor}
                  borderLeft={0}
                  px={1}
                >
                  <Button
                    p={0}
                    h="auto"
                    minW="auto"
                    bg="transparent"
                    color={colorAlt}
                    _hover={{ bg: 'transparent', color: colorError }}
                    onClick={() => removeSignature(index)}
                  >
                    <LuX size={20} />
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </HStack>
          ))}
        </>
      ) : (
        <Text w="100%" color={colorAlt}>
          No signatures
        </Text>
      )}
    </VStack>
  );
}

// Export
export default Signatures;
