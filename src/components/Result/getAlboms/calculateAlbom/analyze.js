function sumRowRation(list) {
  let sumRatio = 0;
  let index = 0;

  while (index < list.length) {
    sumRatio += list[index].ratio;
    index++;
  }

  return sumRatio;
}

function diffSumRowsRatio(list) {
  let rowsRatioDiff = [];
  let index = 0;

  while (index < list.length - 1) {
    rowsRatioDiff.push(list[index] - list[index + 1]);
    index++;
  }

  return rowsRatioDiff;
}

function calculateCoefficientForComparison(rowsRatioDiff) {
  let coeffForComparison = 0;
  let index = 0;

  while (index < rowsRatioDiff.length) {
    coeffForComparison += Math.abs(rowsRatioDiff[index]);
    index++;
  }

  return coeffForComparison;
}

export default (rowsPhotos) => {
  const summedRowsRation = rowsPhotos.map(sumRowRation);
  const rowsRatioDiff = diffSumRowsRatio(summedRowsRation);
  const coeffForComparison = calculateCoefficientForComparison(rowsRatioDiff);

  return {
    rowsPhotos,
    rowsRatioDiff,
    coeffForComparison,
  };
};
