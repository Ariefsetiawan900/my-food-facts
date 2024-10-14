import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getDetailFoodFacts, getAllFoodFacts } from './foodFactsServices';
import getDetailFoodFactsMockData from './__MockData__/getDetailFoodFactsMockData.json';
// import getAllFoodFactsMockData from './__MockData__/getAllFoodFactsMockData.json';

describe('getAllFoodFacts', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  //   test('should return data when the API call is successful', async () => {
  //     const mockData = getAllFoodFactsMockData;
  //     mock
  //       .onGet('/search', {
  //         params: { page: 1, categories_tags: 'fruits', page_size: 5 },
  //       })
  //       .reply(200, mockData);

  //     const data = await getAllFoodFacts('fruits', 1);
  //     expect(data).toEqual(mockData);
  //   });

  test('should return empty data when categories_tags is "okelah" and response is 200', async () => {
    const mockData = {
      count: 0,
      page: 1,
      page_count: 0,
      page_size: 5,
      products: [],
      skip: 0,
    };
    mock
      .onGet('/search', {
        params: { page: 1, categories_tags: 'okelah', page_size: 5 },
      })
      .reply(200, mockData);

    const data = await getAllFoodFacts('okelah', 1);
    expect(data).toEqual(mockData);
  });
});

describe('getDetailFoodFacts', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    jest.setTimeout(10000);
  });

  beforeEach(() => {
    mock = new MockAdapter(axios);
  }, 10000);

  afterEach(() => {
    mock.restore();
  });

  test('should return food facts data when the API call is successful', async () => {
    const mockData = getDetailFoodFactsMockData;

    mock.onGet('/product/3274080005003').reply(200, mockData);

    const data = await getDetailFoodFacts(3274080005003);

    expect(data).toEqual(mockData);
  }, 10000);

  test('should throw an error when the API call fails', async () => {
    mock
      .onGet('/product/998320323')
      .reply(404, { message: 'Product not found' });

    await expect(getDetailFoodFacts(998320323)).rejects.toThrow(
      'Product not found'
    );
  }, 10000);
});
