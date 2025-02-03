// Define function
function getType(value: string) {
  switch (true) {
    case /^0x[a-fA-F0-9]+/.test(value):
      return 'hex';

    case /^\d+(\.\d+)?/.test(value):
      return 'number';

    case /\b(LET|IF|THEN|ELSEIF|ELSE|ENDIF|WHILE|DO|ENDWHILE|EXEC|MAST|ASSERT|RETURN|EQ|NEQ|GT|GTE|LT|LTE|AND|OR|XOR|NAND|NOR|NXOR)\b/.test(
      value
    ):
      return 'script';

    case /\b(TRUE|FALSE)\b/.test(value):
      return 'boolean';

    case /.*?/.test(value):
      return 'string';

    default:
      return 'unknown';
  }
}

// Export
export default getType;
