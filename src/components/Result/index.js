import React, { useState, useEffect } from "react";

import getAlboms from "./getAlboms";
import styles from "./styles.module.css";

function removeExtraLayer(albom) {
  return albom.reduce((memo, item) => {
    return [...memo, ...item];
  }, []);
}

const Result = ({ photos }) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const alboms = getAlboms(photos);

    setResult(alboms.map((albom) => removeExtraLayer(albom)));
  }, [photos]);

  return (
    <div className={styles.container}>
      <h2>ALBOMS</h2>
      {result.map((albom, index) => {
        return (
          <div key={index} className={styles.albom}>
            {albom.map((item, index) => {
              return (
                <img
                  key={index}
                  width={item.width}
                  height={item.height}
                  src={item.image}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Result;
