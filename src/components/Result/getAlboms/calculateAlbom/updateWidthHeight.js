const CONTAINER_WIDTH = 300;

function sumRatio(rowPhotos) {
  let sum = 0;
  let index = 0;

  while (index < rowPhotos.length) {
    sum += rowPhotos[index].ratio;
    index++;
  }

  return sum;
}

function updateSizes(rowPhotos) {
  const ratioSum = sumRatio(rowPhotos);

  const firstPhoto = rowPhotos[0];

  const widthOfFirstPhoto = Math.floor(
    (CONTAINER_WIDTH * firstPhoto.ratio) / ratioSum
  );

  const heightOfFirstPhoto = Math.floor(widthOfFirstPhoto / firstPhoto.ratio);

  let updatedRowPhotos = [
    {
      width: widthOfFirstPhoto,
      height: heightOfFirstPhoto,
      image: firstPhoto.image,
    },
  ];

  let index = 1;

  while (index < rowPhotos.length) {
    const width = Math.floor(
      (CONTAINER_WIDTH * rowPhotos[index].ratio) / ratioSum
    );

    updatedRowPhotos.push({
      image: rowPhotos[index].image,
      width,
      height: heightOfFirstPhoto,
    });

    index++;
  }

  return updatedRowPhotos;
}

export default (rowsPhotos) => {
  const newRowsPhotos = [];
  let index = 0;

  while (index < rowsPhotos.length) {
    newRowsPhotos.push(updateSizes(rowsPhotos[index]));
    index++;
  }

  return newRowsPhotos;
};
