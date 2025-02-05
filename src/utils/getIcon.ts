// Import dependencies
import {
  LuBinary,
  LuCode,
  LuDiff,
  LuHash,
  LuRectangleEllipsis,
  LuType,
} from 'react-icons/lu';

// Define function
function getIcon(type: string) {
  switch (type) {
    case 'boolean':
      return LuBinary;

    case 'number':
      return LuDiff;

    case 'hex':
      return LuHash;

    case 'script':
      return LuCode;

    case 'string':
      return LuType;

    default:
      return LuRectangleEllipsis;
  }
}

// Export
export default getIcon;
