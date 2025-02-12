import useLivePreviewStore from '@/store/useLivePreviewStore';
import useWorkspaceStore from '@/store/useWorkspaceStore';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { LuX } from 'react-icons/lu';

function LivePreview() {
  const [previewURL, setPreviewURL] = useState('');

  // Define store
  const livePreview = useLivePreviewStore((state) => state.livePreview);
  const blobObjectURLs = useLivePreviewStore((state) => state.blobObjectURLs);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  useEffect(() => {
    if (!currentWorkspace) {
      return;
    }

    setPreviewURL('');
  }, [currentWorkspace]);

  useEffect(() => {
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
  }, [livePreview]); // Important: Add 'html' to the dependency array

  return (
    <VStack w="100%" h="100%" fontSize="sm" gap={0}>
      <HStack
        w="100%"
        justify="space-between"
        px={2}
        borderBottom="1px solid"
        borderColor="gray.700"
      >
        <Text as="h3" fontSize="xs" color="gray.500" textTransform="uppercase">
          Live Preview
        </Text>

        <Button
          p={0}
          size="sm"
          bg="transparent"
          color="gray.500"
          _hover={{ bg: 'transparent', color: 'gray.50' }}
          onClick={() => {}}
        >
          <LuX size={20} />
        </Button>
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
