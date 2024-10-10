import { FC } from 'react';
import { IProduct } from '@/interfaces/globalInterfaces';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate } from 'react-router-dom';

interface ICarcListProps {
  dataProduct: IProduct[];
  isLoadingDataProducts: boolean;
}

const CardList: FC<ICarcListProps> = ({
  dataProduct,
  isLoadingDataProducts,
}) => {
    const navigate = useNavigate()
  if (isLoadingDataProducts) {
    return (
      <div className="p-1 flex flex-wrap gap-10 items-center justify-center">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 h-[450px] relative overflow-hidden bg-white rounded-lg max-w-xs  shadow-lg "
            >
              <div className="relative pt-10 px-10 flex items-center justify-center ">
                <Skeleton
                  className="animate-pulse rounded-md"
                  count={1}
                  width={200}
                  height={250}
                />
              </div>
              <div className="relative text-black px-6 pb-6 mt-6">
                <span className="block font-semibold text-xl ">
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={1}
                    width={170}
                  />
                </span>
                <div className="flex justify-between">
                  <span className="block opacity-75 -mb-1">
                    <Skeleton
                      className="animate-pulse rounded-md"
                      count={1}
                      width={140}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className="p-1 flex flex-wrap gap-10 items-center justify-center">
      {dataProduct.map((product) => (
        <div
          key={product._id}
          className="flex-shrink-0 w-80 h-[450px] relative overflow-hidden bg-blue-500 rounded-lg max-w-xs  shadow-lg cursor-pointer"
          onClick={()=>navigate(`/detail/${product._id}`)}
        >
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: 'scale(1.5)', opacity: '0.1' }}
          >
            <rect
              x="159.52"
              y="175"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width="152"
              height="152"
              rx="8"
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center ">
            <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
            <img
              className="relative rounded-md w-24 h-52"
              src={product.image_url || '/src/assets/image_not_available.png'}
              alt={product.product_name}
              loading="lazy"
              width={100}
              height={200}
            />
          </div>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block font-semibold text-xl ">
              {product.product_name || 'Name not available'}
            </span>
            <div className="flex justify-between">
              <span className="block opacity-75 -mb-1">
                {product.allergens_from_ingredients || 'No Data'}{' '}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
