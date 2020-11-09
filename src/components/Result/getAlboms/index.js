import convertToRatio from "./convertToRatio";
import chunk from "./chunk";
import calculateAlbom from "./calculateAlbom";

export default (photos) => {
  const photosWithRatio = convertToRatio(photos);
  const alboms = chunk(photosWithRatio, 9);

  return alboms.map((albom) => calculateAlbom(albom));
};
