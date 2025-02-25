import base64ToImage from '@/utils/base64ToImage';
import { Box, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

function ImageView({ src }) {
  const viewerRef: any = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX);
    setStartY(e.pageY);
  };
  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!isDragging) return;

    const deltaX = e.pageX - startX;
    const deltaY = e.pageY - startY;
    const newScrollLeft = viewerRef.current.scrollLeft - deltaX;
    const newScrollTop = viewerRef.current.scrollTop - deltaY;

    setScrollLeft(newScrollLeft);
    setScrollTop(newScrollTop);
    setStartX(e.pageX); // Important: Update startX for smooth dragging
    setStartY(e.pageY);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  function handleWheel(e) {
    if (viewerRef.current) {
      if (e.ctrlKey) {
        if (e.deltaY > 0) {
          if (zoom <= 5) {
            return;
          }
          setZoom(zoom - 5);
        } else {
          if (zoom > 1000) {
            return;
          }
          setZoom(zoom + 5);
        }
      }
    }
  }

  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.scrollLeft = scrollLeft;
      viewerRef.current.scrollTop = scrollTop;
    }
  }, [scrollLeft, scrollTop]);
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault(); // Prevent default scrolling behavior
      }
    };

    const container = viewerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <Box
      ref={viewerRef}
      cursor={isDragging ? 'grabbing' : 'grab'}
      p={4}
      h="100%"
      overflow="auto"
      userSelect="none"
      className="alt-scrollbar"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Box w={zoom + '%'}>
        <Image src={base64ToImage(src || '') || ''} w="100%" />
      </Box>
    </Box>
  );
}

export default ImageView;
