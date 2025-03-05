import { VStack } from '@chakra-ui/react';
import States from '../States';
import Globals from '../Globals';
import Signatures from '../Signatures';
import Overview from '../Overview';
import PrevStates from '../PrevStates';
import KissVMRunDebug from '../KissVMRunDebug';
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import {
  LuBraces,
  LuBrackets,
  LuChartNoAxesGantt,
  LuGlobe,
  LuLock,
} from 'react-icons/lu';
import { useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '@/constants';

function KissVMPanel() {
  // Define states
  const [accordionIndex, setAccordionIndex] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.kissVMPanelAccordionIndex) ||
        '[1]'
    )
  );

  // Define functions
  function handleOnChange(index: number[]) {
    setAccordionIndex(index);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.kissVMPanelAccordionIndex,
      JSON.stringify(index)
    );
  }

  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <KissVMRunDebug />

      <AccordionBase index={accordionIndex} onChange={handleOnChange}>
        <AccordionItemBase title="Overview" icon={<LuChartNoAxesGantt />} isTop>
          <Overview />
        </AccordionItemBase>

        <AccordionItemBase title="Global Variables" icon={<LuGlobe />}>
          <Globals />
        </AccordionItemBase>

        <AccordionItemBase title="State Variables" icon={<LuBrackets />}>
          <States />
        </AccordionItemBase>

        <AccordionItemBase title="PrevState Variables" icon={<LuBraces />}>
          <PrevStates />
        </AccordionItemBase>

        <AccordionItemBase title="Txn Signatures" icon={<LuLock />} isBottom>
          <Signatures />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

export default KissVMPanel;
