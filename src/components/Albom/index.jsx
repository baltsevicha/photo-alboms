import React, { useState } from "react";

import Previews from "../Previews";
import Result from "../Result";
import styles from "./styles.module.css";

function handleImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onloadend = function (event) {
      const img = new Image();

      img.onload = function () {
        resolve({
          id: Math.floor(Math.random() * Math.floor(1000000)),
          width: this.width,
          height: this.height,
          image: event.target.result,
        });
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

const Albom = () => {
  const [photos, setPhotos] = useState([]);

  const handleChange = async (event) => {
    const files = event.target.files;
    const requests = [];

    for (var i = 0; i < files.length; i++) {
      requests.push(handleImage(files[i]));
    }

    const results = await Promise.all(requests);

    setPhotos([...photos, ...results]);
  };

  const changeOrder = (prevIndex, newIndex) => {
    const newPhotos = photos.reduce((memo, item, index, list) => {
      if (index === prevIndex) {
        memo.push(list[newIndex]);
      } else if (index === newIndex) {
        memo.push(list[prevIndex]);
      } else {
        memo.push(item);
      }

      return memo;
    }, []);

    setPhotos(newPhotos);
  };

  const remove = (removeIndex) => {
    const newPhotos = photos.filter((item, index) => {
      return index !== removeIndex;
    });

    setPhotos(newPhotos);
  };

  console.log("photos = ", photos);
  return (
    <div className={styles.container}>
      <input type="file" onChange={handleChange} multiple />
      <div className={styles.imagesContainer}>
        <Previews photos={photos} changeOrder={changeOrder} remove={remove} />
        <Result photos={photos} />
      </div>
    </div>
  );
};

export default Albom;
