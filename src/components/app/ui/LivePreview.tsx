import useFileStore from '@/store/useFileStore';
import useLivePreviewStore from '@/store/useLivePreviewStore';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { LuRotateCw, LuX } from 'react-icons/lu';

function LivePreview() {
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

  useEffect(() => {
    if (!files) {
      return;
    }

    if (files.includes('index.html')) {
      refreshLivePreview();
    } else {
      setPreviewURL('');
    }
  }, [files]);

  /* useEffect(() => {
    if (!livePreview) {
      setPreviewURL(''); // Clear the preview URL if HTML is empty
      return;
    }

    // 1. Create a Blob from the HTML content
    const blob = new Blob([livePreview], { type: 'text/html' });

    // 2. Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // 3. Update the state with the URL
    setPreviewURL(url);

    // 4. Cleanup: Revoke the URL when the component unmounts or HTML changes
    return () => {
      const temp = [...blobObjectURLs, url];

      for (let i = 0; i < temp.length; i++) {
        URL.revokeObjectURL(temp[i]);
      }
    };
  }, [livePreview]); // Important: Add 'html' to the dependency array */

  /* useEffect(() => {
    if (!livePreview) {
      setPreviewURL(''); // Clear the preview URL if HTML is empty
      return;
    }

    setPreviewURL(livePreview.find((f) => f.file === 'index.html')?.url || '');

    return () => {
      const temp = livePreview.map((f) => f.url);

      for (let i = 0; i < temp.length; i++) {
        URL.revokeObjectURL(temp[i]);
      }
    };
  }, [livePreview]); */

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
        pl={2}
        borderBottom="1px solid"
        borderColor="gray.700"
      >
        <Text as="h3" fontSize="xs" color="gray.500" textTransform="uppercase">
          Live Preview
        </Text>

        <HStack gap={0}>
          <Button
            p={0}
            size="sm"
            bg="transparent"
            color="gray.500"
            _hover={{ bg: 'transparent', color: 'gray.50' }}
            onClick={refreshLivePreview}
          >
            <LuRotateCw size={20} />
          </Button>

          <Button
            p={0}
            size="sm"
            bg="transparent"
            color="gray.500"
            _hover={{ bg: 'transparent', color: 'gray.50' }}
            onClick={() => {
              setShowPreview(false);
              setLivePreview('');
            }}
          >
            <LuX size={20} />
          </Button>
        </HStack>
      </HStack>

      {previewURL ? (
        <iframe
          src={previewURL}
          width="100%"
          height="100%"
          style={{ backgroundColor: 'white' }}
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
