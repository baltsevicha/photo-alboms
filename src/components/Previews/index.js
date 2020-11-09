import React from "react";

import styles from "./styles.module.css";

const Previews = ({ photos, changeOrder, remove }) => {
  return (
    <div>
      {photos.map((photo, index) => {
        return (
          <div key={photo.id} className={styles.container}>
            <img src={photo.image} className={styles.preview} />
            {index !== 0 && (
              <button onClick={() => changeOrder(index, index - 1)}>up</button>
            )}
            {index !== photos.length - 1 && (
              <button onClick={() => changeOrder(index, index + 1)}>
                down
              </button>
            )}
            <button onClick={() => remove(index)}>remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default Previews;
