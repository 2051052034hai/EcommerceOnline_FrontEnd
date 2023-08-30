
const DECREASE = "decrease";
const ASCENDING = "ascending";
const SENLLING = "selling";
const PROMOTION = "promotion"

//Filter theo khoảng giá
export const sortByPrice = (fromPrice, toPrice, data) => {
  let newData = data.filter((product) => {
    const productPrice = product.price;

    return productPrice >= fromPrice && productPrice <= toPrice;
  });

  return newData;
};
;
//Filter theo khoảng giá
export const filterSelectAll = (array, typeSoft) => {

  let new_data = [];

  switch (typeSoft) {
    case SENLLING:
      return array;
    case PROMOTION:
      return array;
    case DECREASE:
     
      new_data = array.sort((a, b) => {
        return b.price - a.price; // Sắp xếp giảm dần theo giá
      });
      return new_data;

    case ASCENDING:
      new_data = array.sort((a, b) => {
        return a.price - b.price; // Sắp xếp giảm dần theo giá
      });
      return new_data;

    default:
      return array;
  }
};
