// Import dependencies
import {
  LuBinary,
  LuDiff,
  LuHash,
  LuRectangleEllipsis,
  LuSquareFunction,
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
      return LuSquareFunction;

    case 'string':
      return LuType;

    default:
      return LuRectangleEllipsis;
  }
}

// Export
export default getIcon;
