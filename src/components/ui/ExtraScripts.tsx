// Import dependencies
import {
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import {
  LuBan,
  // LuBug,
  LuChevronDown,
  LuMenu,
  LuPenLine,
  LuPlus,
  LuTrash,
  LuX,
} from 'react-icons/lu';
// Import store
import useExtraScriptStore from '@/store/useExtraScriptStore';
// Import constants
import { KISS_VM_LANGUAGE } from '@/constants';
import useAppTheme from '@/themes/useAppTheme';

// Extra scripts component
function ExtraScripts() {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define theme
  const { editorTheme } = useAppTheme();

  // Define stores
  const extraScripts = useExtraScriptStore((state) => state.extraScripts);
  const currentExtraScript = useExtraScriptStore(
    (state) => state.currentExtraScript
  );
  const setCurrentExtraScript = useExtraScriptStore(
    (state) => state.setCurrentExtraScript
  );
  const addExtraScript = useExtraScriptStore((state) => state.addExtraScript);
  const renameExtraScript = useExtraScriptStore(
    (state) => state.renameExtraScript
  );
  const updateExtraScript = useExtraScriptStore(
    (state) => state.updateExtraScript
  );
  const clearExtraScripts = useExtraScriptStore(
    (state) => state.clearExtraScripts
  );
  const deleteExtraScript = useExtraScriptStore(
    (state) => state.deleteExtraScript
  );
  const deleteAllExtraScripts = useExtraScriptStore(
    (state) => state.deleteAllExtraScripts
  );

  // Define state
  const [currentExtraScriptName, setCurrentExtraScriptName] = useState('');

  // Temporary fix to keep track of the last active script index
  useEffect(() => {
    localStorage.setItem('active-extra-script', currentExtraScript.toString());
  }, [currentExtraScript]);

  // Temporary fix for saving extra scripts to local storage
  useEffect(() => {
    localStorage.setItem('extra-scripts', JSON.stringify(extraScripts));
  }, [extraScripts]);

  // Render
  return (
    <>
      <VStack w="100%" h="100%" fontSize="sm" gap={3}>
        <HStack w="100%">
          <Menu>
            <MenuButton
              textAlign="start"
              w="100%"
              size="sm"
              fontWeight="normal"
              variant="outline"
              color="gray.500"
              borderColor="gray.700"
              _hover={{ color: 'gray.50', bg: 'gray.800' }}
              _active={{ color: 'gray.50', bg: 'gray.800' }}
              as={Button}
              rightIcon={<LuChevronDown />}
              disabled={extraScripts.length < 1}
            >
              <HStack>
                <Text as="span" color="gray.500">
                  {extraScripts.length > 0 && `@X${currentExtraScript}`}
                </Text>

                <Text isTruncated>
                  {extraScripts.length > 0
                    ? extraScripts[currentExtraScript].name
                    : '---'}
                </Text>
              </HStack>
            </MenuButton>

            <MenuList
              bg="gray.800"
              borderColor="gray.700"
              py={0}
              overflow="hidden"
            >
              {extraScripts.map((_, index) => (
                <MenuItem
                  key={index}
                  py={1}
                  bg="transparent"
                  borderColor="gray.700"
                  _hover={{ bg: 'gray.700' }}
                  onClick={() => setCurrentExtraScript(index)}
                  icon={
                    <Text as="span" fontSize="sm" color="gray.500">
                      {extraScripts.length > 0 && `@X${index}`}
                    </Text>
                  }
                >
                  <Text as="span">
                    {extraScripts.length > 0 && extraScripts[index].name}
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              p={0}
              h="auto"
              minW="auto"
              bg="transparent"
              color="gray.500"
              _hover={{ bg: 'transparent', color: 'gray.50' }}
              _active={{ bg: 'transparent', color: 'gray.50' }}
              as={Button}
            >
              <LuMenu size={24} />
            </MenuButton>

            <MenuList
              bg="gray.800"
              borderColor="gray.700"
              py={0}
              overflow="hidden"
              minW="auto"
            >
              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() => {
                  setCurrentExtraScriptName(
                    extraScripts[currentExtraScript].name
                  );
                  onOpen();
                }}
                icon={<LuPenLine />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span">Rename script</Text>
              </MenuItem>

              <MenuDivider my={1} />

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={addExtraScript}
                icon={<LuPlus />}
                isDisabled={extraScripts.length >= 10}
              >
                <Text as="span">Add script</Text>
              </MenuItem>

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={deleteExtraScript}
                icon={<LuX />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span">Delete script</Text>
              </MenuItem>

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={deleteAllExtraScripts}
                icon={<LuTrash />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span">Delete all scripts</Text>
              </MenuItem>

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={clearExtraScripts}
                icon={<LuBan />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span">Clear script</Text>
              </MenuItem>

              {/* Used for debugging during development */}
              {/* <MenuDivider my={1} />

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() => console.log(currentExtraScript, extraScripts)}
                icon={<LuBug />}
              >
                <Text as="span">Debug</Text>
              </MenuItem> */}
            </MenuList>
          </Menu>
        </HStack>

        {extraScripts.length > 0 ? (
          <Box
            w="100%"
            h="100%"
            border="1px solid"
            borderColor="gray.700"
            overflow="hidden"
          >
            <Editor
              height="100%"
              theme={editorTheme}
              language={KISS_VM_LANGUAGE}
              value={extraScripts[currentExtraScript].value}
              onChange={(value) => updateExtraScript(value || '')}
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 12,
                wordWrap: 'on',
                lineNumbers: 'off', // Removes line numbers
                glyphMargin: false, // Removes space for breakpoints or other glyphs
                folding: false, // Removes the folding controls
                lineDecorationsWidth: 0, // Removes extra space for decorations
                lineNumbersMinChars: 0, // Removes any padding for line numbers
                fixedOverflowWidgets: true, // Prevents widgets from overflowing
              }}
            />
          </Box>
        ) : (
          <Text w="100%" color="gray.500">
            No extra scripts
          </Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="xs">
        <ModalOverlay />

        <ModalContent bg="gray.800" color="gray.500">
          <ModalHeader
            fontSize="md"
            fontWeight="normal"
            textTransform="uppercase"
          >
            Rename Script
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Input
              size="sm"
              variant="outline"
              color="gray.50"
              borderColor="gray.700"
              _placeholder={{ color: 'gray.700' }}
              _focusVisible={{ borderColor: 'gray.50' }}
              _readOnly={{ color: 'gray.500' }}
              value={currentExtraScriptName}
              onChange={(e) => {
                const { value } = e.target;
                if (value.length <= 30) {
                  setCurrentExtraScriptName(value);
                }
              }}
              placeholder="Enter name here"
            />
          </ModalBody>

          <ModalFooter justifyContent="center" gap={2} py={2}>
            <Button
              size="sm"
              variant="ghost"
              colorScheme="blue"
              onClick={() => {
                renameExtraScript(currentExtraScriptName);
                onClose();
              }}
            >
              Save
            </Button>

            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

// Export
export default ExtraScripts;
