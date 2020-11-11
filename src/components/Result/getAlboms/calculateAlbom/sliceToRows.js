function chunkByRows(list, size) {
  let index = list.length;
  let result = [];

  while (index > 0) {
    const startSliceIndex = Math.max(index - size, 0);
    result.unshift(list.slice(startSliceIndex, index));
    index -= size;
  }

  return result;
}

function sliceForTwoPhotos(photos) {
  if (photos[0].ratio > 1 && photos[1].ratio > 1) {
    return [[photos[0]], [photos[1]]];
  }

  return [photos];
}

function sliceForThreePhotos(photos) {
  if (
    photos[0].ratio + photos[1].ratio < 2 ||
    photos[0].ratio + photos[2].ratio < 2 ||
    photos[1].ratio + photos[2].ratio < 2
  ) {
    return [photos];
  }

  return chunkByRows(photos, 2);
}

export default (photos) => {
  const length = photos.length;

  if (length <= 1) {
    return [photos];
  } else if (length === 2) {
    return sliceForTwoPhotos(photos);
  } else if (length === 3) {
    return sliceForThreePhotos(photos);
  } else if (length === 4) {
    return chunkByRows(photos, 2);
  } else {
    return chunkByRows(photos, 3);
  }
};
