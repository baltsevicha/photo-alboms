import sliceToRows from "./sliceToRows";
import analyze from "./analyze";
import shuffle from "./shuffle";
import updateWidthHeight from "./updateWidthHeight";

export default (photos) => {
  const rowsPhotos = sliceToRows(photos);

  let data = analyze(rowsPhotos);

  if (rowsPhotos.length > 1) {
    let tmpData;
    let shuffledRowsPhotos;
    let shuffledData;

    while (
      !shuffledData ||
      data.coeffForComparison > shuffledData.coeffForComparison
    ) {
      tmpData = shuffledData;
      shuffledRowsPhotos = shuffle(data);
      shuffledData = analyze(shuffledRowsPhotos);

      if (tmpData) {
        data = tmpData;
      }
    }
  }

  return updateWidthHeight(data.rowsPhotos);
};
