export default (list, size) => {
  let index = 0;
  let result = [];

  while (index < list.length) {
    result.push(list.slice(index, index + size));
    index += size;
  }

  return result;
};
