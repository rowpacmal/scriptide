import { Text, VStack } from '@chakra-ui/react';
import { AccordionBase, AccordionItemBase } from '../systems/AccordionBase';
import KissVMDeploy from '../KissVMDeploy';
import MiniDappBuild from '../MiniDappBuild';
import Workspace from '../Workspace';
import { LuHammer, LuShare2 } from 'react-icons/lu';
import useAppTheme from '@/themes/useAppTheme';

// Deploy panel component
function DeployBuildPanel() {
  // Define theme
  const { colorAlt } = useAppTheme();

  return (
    <VStack w="100%" fontSize="sm" gap={3}>
      <VStack w="100%" gap={1}>
        <Text
          as="h3"
          w="100%"
          textTransform="uppercase"
          fontSize="xs"
          color={colorAlt}
        >
          Workspaces
        </Text>

        <Workspace />
      </VStack>

      <AccordionBase defaultIndex={[1, 2]}>
        <AccordionItemBase title="Build MiniDapp" icon={<LuHammer />} isTop>
          <MiniDappBuild />
        </AccordionItemBase>

        <AccordionItemBase
          title="Deploy KissVM Scripts"
          icon={<LuShare2 />}
          isBottom
        >
          <KissVMDeploy />
        </AccordionItemBase>
      </AccordionBase>
    </VStack>
  );
}

// Export
export default DeployBuildPanel;
