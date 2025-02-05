// Import dependencies
import {
  MenuDivider,
  MenuItem,
  MenuList,
  // Tooltip
} from '@chakra-ui/react';

function MenuDividerBase() {
  return <MenuDivider my={1} />;
}

// Menu item base component
function MenuItemBase({
  children,
  // label,
  icon,
  onClick,
  disabled = false,
}) {
  return (
    <>
      {/* Disabled the tooltip - was distractive */}
      {/* <Tooltip label={label} placement="right" hasArrow> */}
      <MenuItem
        py={1}
        bg="transparent"
        borderColor="gray.700"
        _hover={{ bg: 'gray.700' }}
        icon={icon}
        onClick={onClick}
        isDisabled={disabled}
      >
        {children}
      </MenuItem>
      {/* </Tooltip> */}
    </>
  );
}

// Menu list base component
function MenuListBase({ children }) {
  // Render
  return (
    <MenuList
      bg="gray.800"
      borderColor="gray.700"
      py={0}
      overflow="hidden"
      minW="auto"
    >
      {children}
    </MenuList>
  );
}

// Export
export { MenuDividerBase, MenuItemBase, MenuListBase };
