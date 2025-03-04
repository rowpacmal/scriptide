// Import dependencies
import {
  Box,
  Button,
  HStack,
  // InputGroup,
  // InputLeftAddon,
  // InputRightAddon,
  // Popover,
  // PopoverArrow,
  // PopoverBody,
  // PopoverCloseButton,
  // PopoverContent,
  // PopoverHeader,
  // PopoverTrigger,
  Spinner,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// Import icons
import {
  LuRotateCw,
  // LuSettings2,
  // LuSquareArrowOutUpRight,
  LuX,
} from 'react-icons/lu';
// Import stores
import useFileStore from '@/stores/useFileStore';
import useLivePreviewStore from '@/stores/useLivePreviewStore';
import usePanelStore from '@/stores/usePanelStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
// Import themes
import useAppTheme from '@/themes/useAppTheme';
// Import components
// import BasicInput from './systems/BasicInput';

// Live preview component
function LivePreview() {
  // Define ref
  const iframeRef = useRef(null);

  // Define state
  const [previewURL, setPreviewURL] = useState('');

  // Define stores
  const livePreview = useLivePreviewStore((state) => state.livePreview);
  const setLivePreview = useLivePreviewStore((state) => state.setLivePreview);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );
  const files = useFileStore((state) => state.files);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  // const liveURL = useLivePreviewStore((state) => state.liveURL);
  // const setLiveURL = useLivePreviewStore((state) => state.setLiveURL);
  const isLoadingLivePreview = useLivePreviewStore(
    (state) => state.isLoadingLivePreview
  );
  const closeRightSidePanel = usePanelStore(
    (state) => state.closeRightSidePanel
  );

  // TODO - New tab/window live preview feature
  // const navigate = useNavigate();
  /* const handleOpenNewTab = () => {
    // Construct the URL you want to open.
    const newTabUrl = '#/live-preview'; // Replace with the desired URL

    // Use window.open() to open a new tab.
    window.open(newTabUrl, '_blank');

    // Optionally, you can also navigate within your current tab.
    // navigate('/some-other-route');
  };
  const handleOpenNewWindow = () => {
    const newWindowUrl = '#/live-preview';
    window.open(newWindowUrl, '_blank', 'width=600,height=400'); // set options for new window.
  }; */

  // Define theme
  const { borderColor, color, colorAlt } = useAppTheme();

  // Define effects
  useEffect(() => {
    if (!files) {
      return;
    }

    for (const file of files) {
      if (file.location === `/workspaces/${currentWorkspace}/index.html`) {
        refreshLivePreview();
        return;
      }
    }

    setPreviewURL('');
  }, [currentWorkspace, files, refreshLivePreview]);
  useEffect(() => {
    if (!livePreview) {
      setPreviewURL(''); // Clear the preview URL if HTML is empty
      return;
    }

    setPreviewURL(livePreview);
  }, [livePreview]);

  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={0}>
      <HStack
        w="100%"
        justify="flex-end"
        borderBottom="1px solid"
        borderColor={borderColor}
        gap={0}
      >
        {/* Unsure if this is needed */}
        {/* <HStack w="100%" gap={0}>
          <Box borderRight="1px solid" borderColor={borderColor}>
            <Popover placement="top" isLazy>
              <PopoverTrigger>
                <Box>
                  <Tooltip label="Settings" placement="bottom" hasArrow>
                    <Button
                      size="sm"
                      bg="transparent"
                      color={colorAlt}
                      p={0}
                      _hover={{ bg: 'transparent', color }}
                      _active={{
                        bg: 'transparent',
                      }}
                      disabled={!previewURL}
                    >
                      <LuSettings2 />
                    </Button>
                  </Tooltip>
                </Box>
              </PopoverTrigger>

              <PopoverContent
                color={colorAlt}
                bg={bg}
                borderColor={borderColor}
              >
                <PopoverArrow bg={bg} shadowColor={borderColor} />

                <PopoverCloseButton />

                <PopoverHeader borderColor={borderColor}>
                  Live Preview
                </PopoverHeader>

                <PopoverBody>
                  <VStack w="100%" gap={1}>
                    <VStack w="100%" gap={0}>
                      <InputGroup size="xs">
                        <InputLeftAddon
                          bg="transparent"
                          borderColor={borderColor}
                          textTransform="uppercase"
                        >
                          Dapp ID
                        </InputLeftAddon>

                        <BasicInput
                          placeholder="Enter Dapp ID here"
                          value={liveURL}
                          onChange={(e) => setLiveURL(e.target.value)}
                          onBlur={refreshLivePreview}
                        />

                        <InputRightAddon
                          bg="transparent"
                          borderColor={borderColor}
                          p={0}
                        >
                          <Tooltip
                            label="Reset default"
                            placement="bottom"
                            hasArrow
                          >
                            <Button
                              size="sm"
                              minW="auto"
                              bg="transparent"
                              color={colorAlt}
                              p={1}
                              _hover={{ bg: 'transparent', color }}
                              _active={{
                                bg: 'transparent',
                              }}
                              onClick={() => {
                                setLiveURL(
                                  (window as any).DEBUG_MINIDAPPID ||
                                    window.location.href.split('/')[3]
                                );
                                refreshLivePreview();
                              }}
                            >
                              <LuRotateCw />
                            </Button>
                          </Tooltip>
                        </InputRightAddon>
                      </InputGroup>
                    </VStack>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>

          <Box borderRight="1px solid" borderColor={borderColor}>
            <Tooltip label="Open in new tab" placement="bottom" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color={colorAlt}
                p={0}
                _hover={{ bg: 'transparent', color }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={() => {
                  setShowPreview(false);
                  setLivePreview('');
                  handleOpenNewTab();
                }}
              >
                <LuSquareArrowOutUpRight />
              </Button>
            </Tooltip>
          </Box>

          <Box w="100%" px={2}>
            <Tooltip label="Base source" placement="bottom" hasArrow>
              <Box>
                <BasicInput
                  size="xs"
                  value={previewURL}
                  onChange={(e) => setPreviewURL(e.target.value)}
                  disabled={!previewURL}
                />
              </Box>
            </Tooltip>
          </Box>
        </HStack> */}

        <HStack gap={0}>
          <Box borderLeft="1px solid" borderColor={borderColor}>
            <Tooltip label="Refresh preview" placement="bottom" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color={colorAlt}
                p={0}
                _hover={{ bg: 'transparent', color }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={refreshLivePreview}
                disabled={!previewURL || isLoadingLivePreview}
              >
                <LuRotateCw />
              </Button>
            </Tooltip>
          </Box>

          <Box borderLeft="1px solid" borderColor={borderColor}>
            <Tooltip label="Close preview" placement="bottom" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color={colorAlt}
                p={0}
                _hover={{ bg: 'transparent', color }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={() => {
                  closeRightSidePanel();
                  setLivePreview('');
                }}
                disabled={!previewURL}
              >
                <LuX />
              </Button>
            </Tooltip>
          </Box>
        </HStack>
      </HStack>

      {isLoadingLivePreview ? (
        <Box w="100%" h="100%" display="grid" placeItems="center">
          <Spinner size="xl" color={borderColor} />
        </Box>
      ) : (
        <>
          {previewURL ? (
            <iframe
              ref={iframeRef}
              src={previewURL}
              width="100%"
              height="100%"
              style={{ backgroundColor: 'white' }}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <Box
              w="100%"
              h="100%"
              display="grid"
              placeItems="center"
              color={colorAlt}
            >
              <Text>No preview available</Text>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
}

export default LivePreview;
