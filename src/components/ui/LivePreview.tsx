import useFileStore from '@/stores/useFileStore';
import useLivePreviewStore from '@/stores/useLivePreviewStore';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import {
  LuRotateCw,
  LuSettings2,
  LuSquareArrowOutUpRight,
  LuX,
} from 'react-icons/lu';

function LivePreview() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [previewURL, setPreviewURL] = useState('');

  // Define store
  const livePreview = useLivePreviewStore((state) => state.livePreview);
  const setLivePreview = useLivePreviewStore((state) => state.setLivePreview);
  // const blobObjectURLs = useLivePreviewStore((state) => state.blobObjectURLs);
  const refreshLivePreview = useLivePreviewStore(
    (state) => state.refreshLivePreview
  );
  const setShowPreview = useLivePreviewStore((state) => state.setShowPreview);
  const files = useFileStore((state) => state.files);
  const liveURL = useLivePreviewStore((state) => state.liveURL);
  const setLiveURL = useLivePreviewStore((state) => state.setLiveURL);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

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
  }, [files]);

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
        justify="space-between"
        borderBottom="1px solid"
        borderColor="gray.700"
        gap={0}
      >
        <HStack w="100%" gap={0}>
          <Box borderRight="1px solid" borderColor="gray.700">
            <Popover placement="top" isLazy>
              <PopoverTrigger>
                <Box>
                  <Tooltip label="Settings" placement="bottom" hasArrow>
                    <Button
                      size="sm"
                      bg="transparent"
                      color="gray.500"
                      p={0}
                      _hover={{ bg: 'transparent', color: 'gray.50' }}
                      _active={{
                        bg: 'transparent',
                      }}
                    >
                      <LuSettings2 />
                    </Button>
                  </Tooltip>
                </Box>
              </PopoverTrigger>

              <PopoverContent
                color="gray.500"
                bg="gray.800"
                borderColor="gray.700"
              >
                <PopoverArrow bg="gray.800" shadowColor="gray.700" />

                <PopoverCloseButton />

                <PopoverHeader borderColor="gray.700">
                  Live Preview
                </PopoverHeader>

                <PopoverBody>
                  <VStack w="100%" gap={1}>
                    <VStack w="100%" gap={0}>
                      <InputGroup size="xs">
                        <InputLeftAddon
                          bg="transparent"
                          borderColor="gray.700"
                          textTransform="uppercase"
                        >
                          Dapp ID
                        </InputLeftAddon>

                        <Input
                          bg="gray.900"
                          color="gray.50"
                          borderColor="gray.700"
                          placeholder="Enter Dapp ID here"
                          _placeholder={{ color: 'gray.700' }}
                          value={liveURL}
                          onChange={(e) => setLiveURL(e.target.value)}
                          onBlur={refreshLivePreview}
                        />

                        <InputRightAddon
                          bg="transparent"
                          borderColor="gray.700"
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
                              color="gray.500"
                              p={1}
                              _hover={{ bg: 'transparent', color: 'gray.50' }}
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

          <Box borderRight="1px solid" borderColor="gray.700">
            <Tooltip label="Open in new tab" placement="bottom" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color="gray.500"
                p={0}
                _hover={{ bg: 'transparent', color: 'gray.50' }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={() => {}}
              >
                <LuSquareArrowOutUpRight />
              </Button>
            </Tooltip>
          </Box>

          <Box w="100%" px={2}>
            <Tooltip label="Base source" placement="bottom" hasArrow>
              <Input
                size="xs"
                bg="gray.800"
                color="gray.50"
                borderColor="gray.700"
                value={previewURL}
                onChange={(e) => setPreviewURL(e.target.value)}
              />
            </Tooltip>
          </Box>
        </HStack>

        <HStack gap={0}>
          <Box borderLeft="1px solid" borderColor="gray.700">
            <Tooltip label="Refresh" placement="bottom" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color="gray.500"
                p={0}
                _hover={{ bg: 'transparent', color: 'gray.50' }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={refreshLivePreview}
              >
                <LuRotateCw />
              </Button>
            </Tooltip>
          </Box>

          <Box borderLeft="1px solid" borderColor="gray.700">
            <Tooltip label="Close" placement="bottom" hasArrow>
              <Button
                size="sm"
                bg="transparent"
                color="gray.500"
                p={0}
                _hover={{ bg: 'transparent', color: 'gray.50' }}
                _active={{
                  bg: 'transparent',
                }}
                onClick={() => {
                  setShowPreview(false);
                  setLivePreview('');
                }}
              >
                <LuX />
              </Button>
            </Tooltip>
          </Box>
        </HStack>
      </HStack>

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
          color="gray.500"
        >
          <Text>No preview available</Text>
        </Box>
      )}
    </VStack>
  );
}

export default LivePreview;
