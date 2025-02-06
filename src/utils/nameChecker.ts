function nameChecker(list: string[], name: string) {
  let count = 0;

  for (let i = 0; i < list.length; i++) {
    if (list[i] === name) {
      count += 1;
    }
  }

  if (count > 0) {
    name += ` (${count + 1})`;
  }

  return name;
}

export default nameChecker;
