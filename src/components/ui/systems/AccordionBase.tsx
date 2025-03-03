// Import dependencies
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
// Import icons
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
// Import themes
import useAppTheme from '@/themes/useAppTheme';

// Accordion base component
function AccordionBase({ children, ...props }) {
  // Define theme
  const { borderColor } = useAppTheme();

  // Render
  return (
    <Accordion w="100%" borderColor={borderColor} allowMultiple {...props}>
      {/* Empty AccordionItem to prevent an index bug on mount/unmount */}
      <AccordionItem display="none">
        <AccordionButton />
      </AccordionItem>

      {children}
    </Accordion>
  );
}

// Accordion item base component
function AccordionItemBase({
  children,
  title,
  icon = null,
  isTop = false,
  isBottom = false,
}) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  // Render
  return (
    <AccordionItem
      borderTop={isTop ? 'none' : ''}
      borderBottom={isBottom ? 'none' : ''}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton px={2} py={1} color={colorAlt} _hover={{ color }}>
            {icon && <Box mr={2}>{icon}</Box>}

            <Text as="span" flex="1" textAlign="left" textTransform="uppercase">
              {title}
            </Text>

            {isExpanded ? <LuChevronUp /> : <LuChevronDown />}
          </AccordionButton>

          <AccordionPanel pb={4} px={2} color={colorAlt} minH={64}>
            {children}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}

// Export
export { AccordionBase, AccordionItemBase };
