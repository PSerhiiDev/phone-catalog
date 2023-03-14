import axios from "axios";

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/api';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products.json`);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const getProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}.json`);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
