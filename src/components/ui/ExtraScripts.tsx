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
import { useContext, useState } from 'react';
import {
  LuBan,
  LuBug,
  LuChevronDown,
  LuMenu,
  LuPenLine,
  LuPlus,
  LuTrash,
  LuX,
} from 'react-icons/lu';
// Import context
import { appContext } from '../../AppContext';
// Import constants
import { DEFAULT_EDITOR_THEME, KISS_VM_LANGUAGE } from '../../constants';

// Extra scripts component
function ExtraScripts() {
  // Define disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define context
  const { extraScripts, setExtraScripts } = useContext(appContext);

  // Define state
  const [activeScript, setActiveScript] = useState(0);
  const [activeScriptName, setActiveScriptName] = useState('');

  // Render
  return (
    <>
      <VStack w="100%" h="100%" fontSize="sm" gap={3}>
        <HStack w="100%">
          <Menu>
            <MenuButton
              textAlign="start"
              w="100%"
              size="xs"
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
                <Text as="span" fontSize="xs" color="gray.500">
                  {extraScripts.length > 0 && `@X${activeScript}`}
                </Text>

                <Text isTruncated>
                  {extraScripts.length > 0
                    ? extraScripts[activeScript].name
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
                  onClick={() => setActiveScript(index)}
                  icon={
                    <Text as="span" fontSize="xs" color="gray.500">
                      {extraScripts.length > 0 && `@X${index}`}
                    </Text>
                  }
                >
                  <Text as="span" fontSize="xs">
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
              <LuMenu />
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
                  setActiveScriptName(extraScripts[activeScript].name);
                  onOpen();
                }}
                icon={<LuPenLine />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span" fontSize="xs">
                  Rename script
                </Text>
              </MenuItem>

              <MenuDivider my={1} />

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() =>
                  setExtraScripts((prevState) => {
                    const temp = [
                      ...prevState,
                      {
                        name: `Extra Script ${prevState.length + 1}`,
                        value: '/* Add your extra script here */',
                      },
                    ];
                    setActiveScript(temp.length - 1);
                    return temp;
                  })
                }
                icon={<LuPlus />}
                isDisabled={extraScripts.length >= 10}
              >
                <Text as="span" fontSize="xs">
                  Add script
                </Text>
              </MenuItem>

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() =>
                  setExtraScripts((prevState) => {
                    const temp = [...prevState];

                    setActiveScript((prevState) => {
                      temp.splice(prevState, 1);
                      if (prevState > 0) {
                        return prevState - 1;
                      }
                      return 0;
                    });

                    return temp;
                  })
                }
                icon={<LuX />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span" fontSize="xs">
                  Delete script
                </Text>
              </MenuItem>

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() =>
                  setExtraScripts(() => {
                    setActiveScript(0);
                    return [];
                  })
                }
                icon={<LuTrash />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span" fontSize="xs">
                  Delete all scripts
                </Text>
              </MenuItem>

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() =>
                  setExtraScripts((prevState) => {
                    const temp = [...prevState];
                    temp[activeScript].value = '';
                    return temp;
                  })
                }
                icon={<LuBan />}
                isDisabled={extraScripts.length < 1}
              >
                <Text as="span" fontSize="xs">
                  Clear script
                </Text>
              </MenuItem>

              <MenuDivider my={1} />

              <MenuItem
                py={1}
                bg="transparent"
                borderColor="gray.700"
                _hover={{ bg: 'gray.700' }}
                onClick={() => console.log(activeScript, extraScripts)}
                icon={<LuBug />}
              >
                <Text as="span" fontSize="xs">
                  Debug
                </Text>
              </MenuItem>
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
              theme={DEFAULT_EDITOR_THEME}
              language={KISS_VM_LANGUAGE}
              value={extraScripts[activeScript].value}
              onChange={(value) =>
                setExtraScripts((prevState) => {
                  const temp = [...prevState];
                  temp[activeScript].value = value || '';
                  return temp;
                })
              }
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
              value={activeScriptName}
              onChange={(e) => {
                const { value } = e.target;
                if (value.length <= 30) {
                  setActiveScriptName(value);
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
                setExtraScripts((prevState) => {
                  const temp = [...prevState];
                  temp[activeScript].name = activeScriptName;
                  return temp;
                });
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
