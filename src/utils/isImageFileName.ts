function isImageFileName(fileName) {
  if (!fileName) {
    return false; // Handle null or undefined input
  }

  const lowerCaseFileName = fileName.toLowerCase();

  // Common image file extensions.  Add more if needed.
  const imageExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.webp',
    '.tiff',
    '.tif',
  ];

  for (const extension of imageExtensions) {
    if (lowerCaseFileName.endsWith(extension)) {
      return true;
    }
  }

  return false;
}

export default isImageFileName;
