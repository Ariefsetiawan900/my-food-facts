import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ApiResponseDetail } from '@/interfaces/globalInterfaces';
import { getDetailFoodFacts } from '@/services/foodFactsServices';
import parse from 'html-react-parser';
import { Badge } from 'flowbite-react';
import clsx from 'clsx';

const Detail = () => {
  const { id_product } = useParams<{ id_product: string }>();
  const styleCustomBadgeOrange =
    'bg-orange-500 text-white-800 group-hover:bg-orange-200 dark:bg-orange-200 dark:text-cyan-800 dark:group-hover:bg-orange-300';

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery<
    ApiResponseDetail,
    Error
  >({
    queryKey: ['getDetailFoodFacts', Number(id_product)],
    queryFn: () => getDetailFoodFacts(Number(id_product)),
    keepPreviousData: true,
  } as UseQueryOptions<ApiResponseDetail, Error>);
  const getTextColorNovaGroupColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'en:1-unprocessed-or-minimally-processed-foods':
        return 'success';
      case 'en:2-processed-culinary-ingredients ':
        return 'warning';
      case 'maya':
        return 'text-green-500';
      case 'en:4-ultra-processed-food-and-drink-products':
        return 'failure';
      default:
        return '';
    }
  };

  console.log('dataku', data);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-gray-800 py-8 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={
                    data?.product.image_url ||
                    '/src/assets/image_not_available.png'
                  }
                  alt={data?.product.product_name}
                  loading="lazy"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Add to Cart
                  </button>
                </div>
                <div className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {data?.product.product_name || 'Name not available'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {parse(
                  (data?.product
                    .ingredients_text_with_allergens_en as string) ||
                    'Loading...'
                ) || 'No data'}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    $29.99
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    In Stock
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex items-center mt-2">
                  {data?.product.nova_groups_tags.map((nova, index) => (
                    <Badge
                      key={index}
                      className={clsx(
                        nova === 'en:3-processed-foods'
                          ? styleCustomBadgeOrange
                          : ''
                      )}
                      color={getTextColorNovaGroupColor(nova)}
                    >
                      {nova}
                    </Badge>
                  ))}

                  {/* <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                  <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button> */}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex items-center mt-2">
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    S
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    M
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    L
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XL
                  </button>
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    XXL
                  </button>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  sed ante justo. Integer euismod libero id mauris malesuada
                  tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet.
                  Duis dapibus augue vel ipsum pretium, et venenatis sem
                  blandit. Quisque ut erat vitae nisi ultrices placerat non eget
                  velit. Integer ornare mi sed ipsum lacinia, non sagittis
                  mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
                  tincidunt mi consectetur.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
