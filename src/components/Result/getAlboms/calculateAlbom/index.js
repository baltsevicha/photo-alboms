import sliceToRows from "./sliceToRows";
import analyze from "./analyze";
import shuffle from "./shuffle";
import updateWidthHeight from "./updateWidthHeight";

export default (photos) => {
  const rowsPhotos = sliceToRows(photos);

  console.log("rowsPhotos = ", rowsPhotos);
  let data = analyze(rowsPhotos);

  if (rowsPhotos.length > 1) {
    let tmpData;
    let shuffledRowsPhotos;
    let shuffledData;

    while (
      !shuffledData ||
      data.coeffForComparison > shuffledData.coeffForComparison
    ) {
      console.log({
        coeff: data.coeffForComparison,
        newCoeff: shuffledData && shuffledData.coeffForComparison,
      });

      tmpData = shuffledData;
      shuffledRowsPhotos = shuffle(data);
      shuffledData = analyze(shuffledRowsPhotos);

      console.log("data = ", data);
      console.log("shuffledData = ", shuffledData);

      if (tmpData) {
        data = tmpData;
      }
    }
  }

  console.log("result = ", data);

  return updateWidthHeight(data.rowsPhotos);
};
