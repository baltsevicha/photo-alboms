function calculateMaxDiffIndex(rowsRatioDiff) {
  let maxDiffIndex = 0;
  let index = 1;

  while (index < rowsRatioDiff.length) {
    if (
      Math.abs(rowsRatioDiff[index]) > Math.abs(rowsRatioDiff[maxDiffIndex])
    ) {
      maxDiffIndex = index;
    }

    index++;
  }

  return maxDiffIndex;
}

function moveImageToPrevRow(index, maxDiffIndex, rowsPhotos) {
  if (index === maxDiffIndex) {
    console.log({ rowsPhotos, index });
    const currentPhotosRow = rowsPhotos[index];
    const firstPhotoOfNextRow = rowsPhotos[index + 1][0];

    return currentPhotosRow.concat(firstPhotoOfNextRow);
  }

  // for the case index === maxDiffIndex + 1
  const currentPhotosRow = rowsPhotos[index];

  return currentPhotosRow.slice(1);
}

function moveImageToNextRow(index, maxDiffIndex, rowsPhotos) {
  if (index === maxDiffIndex) {
    const currentPhotosRow = rowsPhotos[index];

    return currentPhotosRow.slice(0, currentPhotosRow.length - 1);
  }

  // for the case index === maxDiffIndex + 1
  const prevPhotosRow = rowsPhotos[index - 1];
  const lastPhotoOfPrevRow = prevPhotosRow[prevPhotosRow.length - 1];
  const currentPhotosRow = rowsPhotos[index];

  return [lastPhotoOfPrevRow].concat(currentPhotosRow);
}

function moveImageToOtherLine(rowsPhotos, rowsRatioDiff, maxDiffIndex) {
  const moveMethod =
    rowsRatioDiff[maxDiffIndex] > 0 ? moveImageToNextRow : moveImageToPrevRow;

  let newRowsPhotos = [];

  for (let index = 0; index < rowsPhotos.length; index++) {
    if (index === maxDiffIndex || index === maxDiffIndex + 1) {
      const row = moveMethod(index, maxDiffIndex, rowsPhotos);
      newRowsPhotos.push(row);
    } else {
      newRowsPhotos.push(rowsPhotos[index]);
    }
  }

  return newRowsPhotos;
}

export default ({ rowsPhotos, rowsRatioDiff }) => {
  const maxDiffIndex = calculateMaxDiffIndex(rowsRatioDiff);

  return moveImageToOtherLine(rowsPhotos, rowsRatioDiff, maxDiffIndex);
};
