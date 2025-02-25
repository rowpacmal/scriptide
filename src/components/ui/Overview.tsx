// Import dependencies
import {
  Box,
  Button,
  Card,
  Code,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
  useClipboard,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
// Import utilities
import getIcon from '@/utils/getIcon';
import getType from '@/utils/getType';
// Import store
import useRunScriptStore from '@/stores/useRunScriptStore';
import useAppTheme from '@/themes/useAppTheme';

// Types
type OverviewItemProps = {
  children?: React.ReactNode;
  label: string;
  placeholder: string;
  h?: string | number;
};

// Utility components
function OverviewItem({
  children,
  label,
  placeholder,
  h = 'auto',
}: OverviewItemProps) {
  // Define clipboard
  const { onCopy, value, setValue, hasCopied } = useClipboard('');

  // Define theme
  const { color, colorAlt, colorSuccess, bgAlt, borderColor } = useAppTheme();

  useEffect(() => {
    if (!children || typeof children !== 'string') {
      return;
    }

    const valueToCopy = children;
    setValue(valueToCopy);
  }, [children]);

  return (
    <VStack as="section" w="100%" gap={1}>
      <HStack as="header" w="100%" justifyContent="space-between">
        <Text as="h3" textTransform="uppercase" color={colorAlt} fontSize="xs">
          {label}
        </Text>

        <Button
          size="xs"
          h="16px"
          px={1}
          fontSize="2xs"
          borderRadius="sm"
          color={hasCopied ? colorSuccess : colorAlt}
          border="1px solid"
          borderColor={hasCopied ? colorSuccess : borderColor}
          bg="transparent"
          _hover={{
            color: !value ? '' : hasCopied ? colorSuccess : color,
            borderColor: !value ? '' : hasCopied ? colorSuccess : color,
          }}
          _active={{
            color: !value ? '' : color,
            borderColor: !value ? '' : color,
          }}
          textTransform="uppercase"
          onClick={onCopy}
          disabled={!value}
        >
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </HStack>

      <Card w="100%" bg={bgAlt} color={color} p={2}>
        <Text as="pre" h={h} overflow="auto" whiteSpace="pre-wrap" pr={2}>
          {children || (
            <Text as="span" color={colorAlt}>
              {placeholder}
            </Text>
          )}
        </Text>
      </Card>
    </VStack>
  );
}
function VariableItem({ variable, value }) {
  // Define theme
  const { accent, colorReversed, bgReversed } = useAppTheme();

  return (
    <Tooltip
      label={`${variable} : ${getType(value)}`}
      placement="left"
      hasArrow
    >
      <ListItem display="grid" gridTemplateColumns="1.5rem 1fr">
        <ListIcon as={getIcon(getType(value))} color={accent} my={1.5} />

        <VStack w="100%" gap={0.5}>
          <Text w="100%" wordBreak="break-all">
            {variable}&nbsp;
            <Text as="span" color={accent}>
              : {getType(value)}
            </Text>
          </Text>

          <Code
            w="100%"
            flexGrow={1}
            color={colorReversed}
            bg={bgReversed}
            wordBreak="break-all"
          >
            {value}
          </Code>
        </VStack>
      </ListItem>
    </Tooltip>
  );
}

// Overview component
function Overview() {
  // Define stores
  const cleanScript = useRunScriptStore((state) => state.cleanScript);
  const script0xAddress = useRunScriptStore((state) => state.script0xAddress);
  const scriptMxAddress = useRunScriptStore((state) => state.scriptMxAddress);

  const scriptVariables = useRunScriptStore((state) => state.scriptVariables);
  const totalScriptInstructions = useRunScriptStore(
    (state) => state.totalScriptInstructions
  );

  // Define theme
  const { accent, color, colorAlt, bgAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <OverviewItem label="Clean script" placeholder="Clean script here" h={32}>
        {cleanScript}
      </OverviewItem>

      <OverviewItem label="0x Address" placeholder="Script 0xAddress here">
        {script0xAddress}
      </OverviewItem>

      <OverviewItem label="Mx Address" placeholder="Script MxAddress here">
        {scriptMxAddress}
      </OverviewItem>

      <VStack as="section" w="100%" gap={1}>
        <HStack as="header" w="100%" justifyContent="space-between">
          <Text
            as="h3"
            textTransform="uppercase"
            color={colorAlt}
            fontSize="xs"
          >
            Total instructions
          </Text>
        </HStack>

        <Card w="100%" bg={bgAlt} color={color} p={2}>
          <Text as="pre" h="auto" overflow="auto" whiteSpace="pre-wrap" pr={2}>
            {totalScriptInstructions ? (
              <>
                <Text as="span" color={accent}>
                  {totalScriptInstructions}
                </Text>{' '}
                instructions
              </>
            ) : (
              <Text as="span" color={colorAlt}>
                Script MxAddress here
              </Text>
            )}
          </Text>
        </Card>
      </VStack>

      <VStack as="section" w="100%" gap={1}>
        <Box as="header" w="100%">
          <Text
            as="h3"
            textTransform="uppercase"
            color={colorAlt}
            fontSize="xs"
          >
            Script variables
          </Text>
        </Box>

        <Card w="100%" bg={bgAlt} color={color} p={2}>
          {Object.entries(scriptVariables).length > 0 ? (
            <List spacing={1}>
              {Object.entries(scriptVariables).map(([variable, value]) => (
                <VariableItem
                  key={variable}
                  variable={variable}
                  value={value}
                />
              ))}
            </List>
          ) : (
            <Text as="pre" color={colorAlt} whiteSpace="pre-wrap">
              Script variables here
            </Text>
          )}
        </Card>
      </VStack>
    </VStack>
  );
}

// Export
export default Overview;
