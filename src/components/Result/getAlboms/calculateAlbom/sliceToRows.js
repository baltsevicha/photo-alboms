import chunk from "../chunk";

function sliceForTwoPhotos(photos) {
  const sumRation = photos[0].ratio + photos[1].ratio;

  if (sumRation <= 2) {
    return [photos];
  }

  return [[photos[0]], [photos[1]]];
}

export default (photos) => {
  const length = photos.length;

  if (length <= 1) {
    return [photos];
  } else if (length === 2) {
    return sliceForTwoPhotos(photos);
  } else if (length <= 4) {
    return chunk(photos, 2);
  } else {
    return chunk(photos, 3);
  }
};
