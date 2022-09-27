const getImages = async (profileNumber) => {
  const promises = [];
  const allImages = [];

  for (let index = 1; index < 4; index++) {
    const { Language, Market } = window._ShopContext;
    const imageUrl = `${
      window.location.origin
    }//assets/${Language.toLowerCase()}-${Market.toLowerCase()}/images/product/prod_${profileNumber}_${index}_613x613.jpg`;
    allImages.push(imageUrl);
    promises.push(fetch(imageUrl));
  }
  const allPromise = await Promise.all(promises);
  const images = allPromise
    .map((item, i) => {
      if (item.status === 200) {
        return allImages[i];
      } else {
        return null;
      }
    })
    .filter(Boolean);
  //console.log(images);
  return images;
};

export default getImages;
