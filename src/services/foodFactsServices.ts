import axiosConfig from './axiosConfig';

export const getAllFoodFacts = async (
  categories_tags: string,
  page: number
) => {
  const response = await axiosConfig.get('/search', {
    params: {
      page,
      categories_tags,
      page_size: 5,
    },
  });
  return response.data;
};

export const getDetailFoodFacts = async (id: number) => {
  const response = await axiosConfig.get(`/product/${id}`);
  return response.data;
};
