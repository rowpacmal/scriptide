import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Text,
  VStack,
} from '@chakra-ui/react';
import States from '../States';
import Globals from '../Globals';
import Signatures from '../Signatures';
import useAppTheme from '@/themes/useAppTheme';
import Overview from '../Overview';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';
import PrevStates from '../PrevStates';
import RunDebug from '../RunDebug';

function PanelItem({ children, title, isTop = false, isBottom = false }) {
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
            <Text
              as="span"
              flex="1"
              textAlign="left"
              fontSize="xs"
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

function KissVMPanel() {
  // Define theme
  const { borderColor } = useAppTheme();

  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <RunDebug />

      <Accordion
        defaultIndex={[1]}
        borderColor={borderColor}
        w="100%"
        allowMultiple
      >
        {/* Empty AccordionItem to prevent a index bug on mount/unmount */}
        <AccordionItem display="none">
          <AccordionButton />
        </AccordionItem>

        <PanelItem title="Overview" isTop>
          <Overview />
        </PanelItem>

        <PanelItem title="Global Variables">
          <Globals />
        </PanelItem>

        <PanelItem title="State Variables">
          <States />
        </PanelItem>

        <PanelItem title="PrevState Variables">
          <PrevStates />
        </PanelItem>

        <PanelItem title="Txn Signatures" isBottom>
          <Signatures />
        </PanelItem>
      </Accordion>
    </VStack>
  );
}

export default KissVMPanel;
