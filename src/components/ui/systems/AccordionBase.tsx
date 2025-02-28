import useAppTheme from '@/themes/useAppTheme';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

function AccordionBase({ children, ...props }) {
  // Define theme
  const { borderColor } = useAppTheme();

  return (
    <Accordion w="100%" borderColor={borderColor} allowMultiple {...props}>
      {/* Empty AccordionItem to prevent a index bug on mount/unmount */}
      <AccordionItem display="none">
        <AccordionButton />
      </AccordionItem>

      {children}
    </Accordion>
  );
}

function AccordionItemBase({
  children,
  title,
  icon = null,
  isTop = false,
  isBottom = false,
}: any) {
  // Define theme
  const { color, colorAlt } = useAppTheme();

  return (
    <AccordionItem
      borderTop={isTop ? 'none' : ''}
      borderBottom={isBottom ? 'none' : ''}
    >
      {({ isExpanded }) => (
        <>
          <AccordionButton px={2} py={1} color={colorAlt} _hover={{ color }}>
            {icon && <Box mr={2}>{icon}</Box>}

            <Text
              as="span"
              flex="1"
              textAlign="left"
              // fontSize="sm"
              textTransform="uppercase"
            >
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

export { AccordionBase, AccordionItemBase };
