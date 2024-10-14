import axiosConfig from './axiosConfig';
import axios from 'axios';

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
  try {
    if (response.status === 500) {
      throw new Error('Server Error');
    }
    return response.data;
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'message' in error) {
      const errorMessage = (error as { message: string }).message;
      if (errorMessage.includes('timeout')) {
        throw new Error('Request timed out');
      }
      throw new Error('Failed to fetch users');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getDetailFoodFacts = async (id: number) => {
  try {
    const response = await axiosConfig.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data?.message || 'Product not found');
    } else {
      throw new Error('Product not found');
    }
  }
};
