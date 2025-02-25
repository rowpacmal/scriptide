import useEditorStore from '@/store/useEditorStore';
import useFileStore from '@/store/useFileStore';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { LuChevronRight, LuX } from 'react-icons/lu';
import CodeEditor from './CodeEditor';
import useAppTheme from '@/themes/useAppTheme';
import ImageView from './ImageView';

function NoOpenFile() {
  const { colorAlt } = useAppTheme();

  return (
    <Text
      h="100%"
      display="grid"
      placeItems="center"
      color={colorAlt}
      fontSize="sm"
      userSelect="none"
    >
      No file opened
    </Text>
  );
}

function CodeEditorPanel() {
  // Define refs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollContainerRef: any = useRef(null);

  // Define theme
  const { accent, color, colorAlt, bg, bgShade, borderColor } = useAppTheme();

  // Define store
  const allCodes = useEditorStore((state) => state.allCodes);
  const removeCode = useEditorStore((state) => state.removeCode);
  const currentFile = useFileStore((state) => state.currentFile);
  const setCurrentFile = useFileStore((state) => state.setCurrentFile);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const tabIndex = useEditorStore((state) => state.tabIndex);
  const setTabIndex = useEditorStore((state) => state.setTabIndex);

  // Define handlers
  const handleWheel = (e) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += e.deltaY; // Or e.deltaX for more natural horizontal scrolling
    }
  };

  return (
    <Box h="100%" borderTop="1px solid" borderColor={borderColor}>
      {allCodes.length > 0 ? (
        <Tabs
          variant="enclosed"
          h="100%"
          w="100%"
          index={tabIndex}
          onChange={setTabIndex}
        >
          <Box
            pb={1}
            h="2.5rem"
            ref={scrollContainerRef}
            overflowX="auto"
            overflowY="hidden"
            className="tab-scrollbar"
            onWheel={handleWheel}
          >
            <TabList
              id="tab-list"
              bg={bgShade}
              borderColor={borderColor}
              minW="fit-content"
              onClick={(e) => {
                if ((e.target as HTMLDivElement).id === 'tab-list') {
                  setCurrentFile(null);
                  setCurrentFolder(null);
                  setTabIndex(-1);
                }
              }}
            >
              {allCodes.map(({ file }) => (
                <Tooltip
                  key={file}
                  label={file.split('/').pop()}
                  placement="bottom"
                  hasArrow
                >
                  <Tab
                    p={0}
                    borderRadius="none"
                    borderTop="2px solid"
                    borderTopColor="transparent"
                    borderLeft="none"
                    borderRight="1px solid"
                    borderRightColor={borderColor}
                    _selected={{
                      bg,
                      borderColor: borderColor,
                      borderTopColor: accent,
                      borderBottomColor: bg,
                    }}
                  >
                    <HStack h="100%" gap={0}>
                      <Text
                        cursor="pointer"
                        h="100%"
                        color={colorAlt}
                        pl={2}
                        fontSize="sm"
                        userSelect="none"
                        display="grid"
                        placeContent="center"
                        onClick={() => {
                          setCurrentFolder(
                            file.split('/').slice(0, -1).join('/')
                          );
                          setCurrentFile(file);
                        }}
                        whiteSpace="nowrap"
                      >
                        {file.split('/').pop()}
                      </Text>

                      <Box
                        p={2}
                        bg="transparent"
                        color={colorAlt}
                        _hover={{ bg: 'transparent', color }}
                        onClick={() => {
                          removeCode(file);

                          const next = allCodes[tabIndex + 1];
                          if (next) {
                            setCurrentFile(next.file);
                            setCurrentFolder(
                              next.file.split('/').slice(0, -1).join('/')
                            );
                          } else {
                            setCurrentFile(null);
                            setCurrentFolder(null);
                            setTabIndex(-1);
                          }
                        }}
                      >
                        <LuX />
                      </Box>
                    </HStack>
                  </Tab>
                </Tooltip>
              ))}
            </TabList>
          </Box>

          <TabPanels h="calc(100% - 2.5rem)">
            {allCodes.map(({ file, code, isImg }) => {
              const path = ['root', ...file.split('/').slice(3)];

              return (
                <TabPanel key={file} h="100%" p={0}>
                  <Breadcrumb
                    spacing={1}
                    color={colorAlt}
                    fontSize="xs"
                    h="1.5rem"
                    py={1}
                    px={2}
                    separator={
                      <Box color={borderColor}>
                        <LuChevronRight />
                      </Box>
                    }
                    userSelect="none"
                  >
                    {path.map((f, i) => (
                      <BreadcrumbItem
                        key={i}
                        color={path.length - 1 === i ? accent : ''}
                      >
                        <Text>{f}</Text>
                      </BreadcrumbItem>
                    ))}
                  </Breadcrumb>

                  <Box h="calc(100% - 1.5rem)">
                    {isImg ? (
                      <ImageView src={code} />
                    ) : (
                      <CodeEditor file={file} code={code} />
                    )}
                  </Box>
                </TabPanel>
              );
            })}

            {!currentFile && <NoOpenFile />}
          </TabPanels>
        </Tabs>
      ) : (
        <NoOpenFile />
      )}
    </Box>
  );
}

export default CodeEditorPanel;
