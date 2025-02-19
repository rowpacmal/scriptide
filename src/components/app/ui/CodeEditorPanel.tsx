import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
import base64ToImage from '@/utils/base64ToImage';
import {
  Box,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { LuX } from 'react-icons/lu';
import CodeEditor from './CodeEditor';

function CodeEditorPanel() {
  // Define refs
  const scrollContainerRef: any = useRef(null);

  // Define store
  const allCodes = useEditorStore((state) => state.allCodes);
  const removeCode = useEditorStore((state) => state.removeCode);
  const currentFile = useFileStore((state) => state.currentFile);

  // Define handlers
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY; // Or e.deltaX for more natural horizontal scrolling
    }
  };

  return (
    <Box h="100%" borderTop="1px solid" borderColor="gray.700">
      {allCodes.length > 0 ? (
        <Tabs variant="enclosed" h="100%" w="100%">
          <Box
            pb={1}
            ref={scrollContainerRef}
            overflowX="scroll"
            overflowY="hidden"
            className="tab-scrollbar"
            onWheel={handleWheel}
          >
            <TabList
              bg="blackAlpha.200"
              borderColor="gray.700"
              minW="fit-content"
            >
              {allCodes.map(({ index, file }) => (
                <Tab
                  key={index}
                  p={0}
                  borderRadius="none"
                  borderTopColor="transparent"
                  borderLeft="none"
                  borderRight="1px solid"
                  borderRightColor="gray.700"
                  _selected={{
                    bg: 'gray.900',
                    borderColor: 'gray.700',
                    borderTopColor: 'blue.500',
                    borderBottomColor: 'gray.900',
                  }}
                >
                  <HStack gap={0}>
                    <Text
                      cursor="pointer"
                      h="100%"
                      color="gray.500"
                      pl={2}
                      fontSize="sm"
                      userSelect="none"
                      display="grid"
                      placeContent="center"
                    >
                      {file.split('/').pop()}
                    </Text>

                    <Box
                      p={2}
                      bg="transparent"
                      color="gray.500"
                      _hover={{ bg: 'transparent', color: 'gray.50' }}
                      onClick={() => removeCode(index)}
                    >
                      <LuX />
                    </Box>
                  </HStack>
                </Tab>
              ))}
            </TabList>
          </Box>

          <TabPanels h="100%">
            {allCodes.map(({ index, file, code, isImg }) => (
              <TabPanel key={index} h="100%" p={0}>
                {isImg ? (
                  <Image src={base64ToImage(code || '') || ''} />
                ) : (
                  <CodeEditor index={index} file={file} code={code} />
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      ) : (
        <Text
          h="100%"
          display="grid"
          placeItems="center"
          color="gray.500"
          fontSize="sm"
        >
          No file opened
        </Text>
      )}
    </Box>
  );
}

export default CodeEditorPanel;
