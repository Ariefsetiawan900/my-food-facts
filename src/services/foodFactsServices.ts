import axiosConfig from './axiosConfig';

export const getAllFoodFacts = async (page: 1) => {
  const response = await axiosConfig.get(`/?page=${page}&page_size=7`);
  return response;
};
