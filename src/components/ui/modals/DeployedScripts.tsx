// Import dependencies
import {
  Box,
  Checkbox,
  Code,
  HStack,
  useToast,
  VStack,
} from '@chakra-ui/react';
// Import stores
import useDeploymentStore from '@/stores/useDeploymentStore';
import useModalStore from '@/stores/useModalStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import types
import { IOverviewItemProps, TScript } from '@/types';
// Import components
import { BasicHeading3 } from '../systems/BasicHeadings';
import ConfirmModal from './ConfirmModal';

// Overview item component
function OverviewItem({
  children,
  title,
  h = 'auto',
  className = '',
}: IOverviewItemProps) {
  // Define theme
  const { bgAlt } = useAppTheme();

  // Render
  return (
    <VStack w="100%" gap={0.5}>
      <BasicHeading3 w="100%">{title}</BasicHeading3>

      <Box bg={bgAlt} w="100%" p={2} pb={0.5} borderRadius="md">
        <Code
          as="pre"
          w="100%"
          bg="transparent"
          overflow="auto"
          whiteSpace="pre-wrap"
          wordBreak="break-all"
          h={h}
          className={className}
        >
          {children}
        </Code>
      </Box>
    </VStack>
  );
}

// Show deployed script details modal component
function DeployedScripts() {
  // Define toast
  const toast = useToast();

  // Define stores
  const removeScript = useDeploymentStore((state) => state.removeScript);
  const modalProps = useModalStore((state) => state.modalProps) as TScript;
  const onClose = useModalStore((state) => state.onClose);

  // Define theme
  const { bgAlt, colorAlt } = useAppTheme();

  // Define handlers
  function handleOnClick() {
    removeScript(modalProps?.address);
    toast({
      title: 'Script deletion pending',
      description:
        'A script deletion request is pending. Please go to the "Pending" dapp to view the request.',
      status: 'warning',
      duration: 9000,
      isClosable: true,
    });
  }

  // Render
  return (
    <ConfirmModal
      title="Script Details"
      buttonLabel="Delete"
      colorScheme="red"
      onClose={onClose}
      onClick={handleOnClick}
      disabled={modalProps?.default}
    >
      <VStack w="100%">
        <HStack gap={4} bg={bgAlt} px={2} py={1} borderRadius="md">
          <Checkbox
            cursor="default"
            size="sm"
            colorScheme="blue"
            borderColor={colorAlt}
            _checked={{ color: 'blue.500' }}
            isChecked={modalProps?.default}
          >
            Default
          </Checkbox>

          <Checkbox
            cursor="default"
            size="sm"
            colorScheme="blue"
            borderColor={colorAlt}
            _checked={{ color: 'blue.500' }}
            isChecked={modalProps?.simple}
          >
            Simple
          </Checkbox>

          <Checkbox
            cursor="default"
            size="sm"
            colorScheme="blue"
            borderColor={colorAlt}
            _checked={{ color: 'blue.500' }}
            isChecked={modalProps?.track}
          >
            Track
          </Checkbox>
        </HStack>

        <OverviewItem title="Address">{modalProps?.address}</OverviewItem>

        <OverviewItem title="MxAddress">{modalProps?.miniaddress}</OverviewItem>

        <OverviewItem title="Public Key">{modalProps?.publickey}</OverviewItem>

        <OverviewItem title="Script" h={24} className="scrollbar">
          {modalProps?.script}
        </OverviewItem>
      </VStack>
    </ConfirmModal>
  );
}

// Export
export default DeployedScripts;
