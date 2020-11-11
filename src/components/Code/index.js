import React from "react";

import styles from "./styles.module.css";

const Code = () => {
  return (
    <div className={styles.container}>
      <h2>CODE</h2>
      <i>Входные данные:</i>
      <pre className={styles.data}>{`
  const photos = [{
    width: 220,
    height: 220,
    image: "https://..."
  }, {
    width: 1200,
    height: 800,
    image: "https://..."
  }]
      `}</pre>
      <br />
      <b>
        1) Первый шаг, это посчитать соотношение ширины к высоте картинки
        (Ratio)
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  function convertToRatio(photos) {
    const newPhotos = [];
    let index = 0;

    while (index < photos.length) {
      newPhotos.push({
        width: photo.width,
        height: photo.height,
        image: photo.image,
        ratio: photo.width / photo.height,
      })
    }

    return photos;
  }
      `}</pre>
      <i>Данные на выходе:</i>
      <pre className={styles.data}>{`
  const photosWithRatio = [{
    width: 220,
    height: 220,
    image: "https://...",
    ratio: 1,
  }, {
    width: 1200,
    height: 800,
    image: "https://...",
    ratio: 1.5
  }]
      `}</pre>
      <br />
      <b>
        2) По требованиям в альбоме максимальное кол-во фото 9,
        <br />
        поэтому разобьем фотки на несколько альбомов
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  const alboms = chunk(photosWithRatio, 9);

  function chunk(list, size) {
    let index = 0;
    let result = [];
  
    while (index < list.length) {
      result.push(list.slice(index, index + size));
      index += size;
    }
  
    return result;
  };
      `}</pre>
      <i>Данные на выходе:</i>
      <pre className={styles.data}>{`
  const alboms = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}],
  ];
      `}</pre>
      <b>
        3) Далее нужно вычислить каждый альбом в отдельности
        <br />
        Саму функцию calculateAlbom рассмотрим ниже
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  const calculatedAlboms = [];
  let index = 0;

  while (index < alboms.length) {
    const calculatedAlbom = calculateAlbom(alboms[index]);
    calculatedAlboms.push(calculatedAlbom);
    index++;
  }

  return calculatedAlboms;
      `}</pre>
      <i>Данные на выходе:</i>
      <pre className={styles.data}>{`
  const calculatedAlboms = [
    [ // first albom
      [{}, {}, {}, {}], // first row of photos
      [{}, {}] // second row of photos
      [{}, {}, {}] // third row of photos
    ], [ // second albom
      [{}, {}, {}],
      [{}, {}]
    ]
  ];

  // example of photo
  const albom = {
    width: 48, // updated width
    height: 48, // updated height
    image: "https://..."
  }
      `}</pre>
      <b>
        4) Рассмотрим внутренности calculateAlbom
        <br />
        для начала разделим картинки на предположительные ряды
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  const rowsPhotos = sliceToRows(photos);

  function sliceToRows(photos) {
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

  // chunk in reverse direction
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
      `}</pre>
      <i>Данные на выходе:</i>
      <pre className={styles.data}>{`
      const photos = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

      ->
      
      const rowsPhotos = [
        [{}, {}, {}],
        [{}, {}, {}],
        [{}, {}, {}]
      ]
      `}</pre>
      <b>
        5) Для того чтобы оценить насколько хорошо мы разбили картинки
        <br />
        нужно получить какие то данные для сравнения.
        <br />
        Поэтому проанализируем текущее разбиение с помощью функции analyze
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  let data = analyze(rowsPhotos);

  function analyze(rowsPhotos) {
    // we need to calculate ratio sum of each row 
    const summedRowsRation = sumRowRationForEachRow(rowsPhotos);

    // we need to calculate ratio diff between rows
    // it helps us to understand the direction for moving photo
    const rowsRatioDiff = diffSumRowsRatio(summedRowsRation);

    // we need some value for understanding current albom is better or after shufle
    const coeffForComparison = calculateCoefficientForComparison(rowsRatioDiff);

    return {
      rowsPhotos,
      rowsRatioDiff,
      coeffForComparison,
    };
  }

  function sumRowRationForEachRow(rowsPhotos) {
    let rowsSum = [];
    let rowIndex = 0;

    while (rowIndex < rowsPhotos.length) {
      let sum = 0;
      let photoIndex = 0;

      while (photoIndex < rowsPhotos[rowIndex].length) {
        sum += rowsPhotos[rowIndex].ration;
        photoIndex++;
      }

      rowsSum.push(sum);
      rowIndex++;
    }

    return rowsSum;
  }

  function diffSumRowsRatio(summedRowsRation) {
    let rowsRatioDiff = [];
    let index = 0;

    while (index < summedRowsRation.length - 1) {
      rowsRatioDiff.push(summedRowsRation[index] - summedRowsRation[index + 1]);
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
      `}</pre>
      <i>Данные на выходе:</i>
      <pre className={styles.data}>{`
  const rowsPhotos = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}]
  ]

  ->

  const data = {
    rowsPhotos: [[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]
    rowsRatioDiff: [0.6537, -0.4366]
    coeffForComparison; 1.0903,
  };
      `}</pre>
      <b>
        6) Далее нужно попытаться перемешать картинки
        <br />
        И попытаться проанализировать перемешанные картинки
        <br />И так мешать пока перемешанные данные не будут хуже предыдущей
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  let data = analyze(rowsPhotos);
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

  console.log(data); // the best solution
      `}</pre>
      <b>
        7) Изучим как работает shuffle
        <br />
        Основная идея, это по разности между суммой Ration,
        <br />
        переносить одну картинку либо на следующую строку либо на предыдушую
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  let shuffledRowsPhotos = shuffle(data);

  function shuffle({ rowsPhotos, rowsRatioDiff }) {
    const maxDiffIndex = calculateMaxDiffIndex(rowsRatioDiff);

    return moveImageToOtherLine(rowsPhotos, rowsRatioDiff, maxDiffIndex);
  }

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

  function moveImageToOtherLine(rowsPhotos, rowsRatioDiff, maxDiffIndex) {

    // see below implementation moveImageToNextRow and moveImageToPrevRow
    const moveMethod = rowsRatioDiff[maxDiffIndex] > 0 ? moveImageToNextRow : moveImageToPrevRow;
  
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

  function moveImageToPrevRow(index, maxDiffIndex, rowsPhotos) {
    if (index === maxDiffIndex) {
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
      `}</pre>
      <i>Данные на выходе:</i>
      <pre className={styles.data}>{`
  const photosBefore = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}]
  ]

  ->

  const photosAfter = [
    [{}, {}],
    [{}, {}, {}, {}],
    [{}, {}, {}]
  ]
      `}</pre>
      <b>
        8) После распределения картинок по рядам,
        <br />
        нам нужно вычесть новые размеры картинок при размере бабла 300px
      </b>
      <br />
      <i>Код:</i>
      <pre className={styles.code}>{`
  const CONTAINER_WIDTH = 300; // size of bubble

  const updatedRowsPhotos = updateWidthHeight(data.rowsPhotos)

  function updateWidthHeight(rowsPhotos) {
    const newRowsPhotos = [];
    let index = 0;
  
    while (index < rowsPhotos.length) {
      newRowsPhotos.push(updateSizes(rowsPhotos[index]));
      index++;
    }
  
    return newRowsPhotos;
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

  function sumRatio(rowPhotos) {
    let sum = 0;
    let index = 0;
  
    while (index < rowPhotos.length) {
      sum += rowPhotos[index].ratio;
      index++;
    }
  
    return sum;
  }
      `}</pre>
    </div>
  );
};

export default Code;
