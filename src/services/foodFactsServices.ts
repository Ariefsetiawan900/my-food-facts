import axiosConfig from './axiosConfig';
import queryString from 'query-string';

export const getAllFoodFacts = async (
  categories_tags: string,
  page: number
) => {
  const response = await axiosConfig.get('/', {
    params: {
      page,
      categories_tags,
      page_size: 5,
    },
  });
  return response.data;
};
