export default (photos) => {
  return photos.map((photo) => {
    return {
      image: photo.image,
      width: photo.width,
      height: photo.height,
      ratio: photo.width / photo.height,
    };
  });
};
