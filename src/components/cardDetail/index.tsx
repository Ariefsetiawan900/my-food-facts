import { useNavigate } from 'react-router-dom';
import { ApiResponseDetail } from '@/interfaces/globalInterfaces';
import parse from 'html-react-parser';
import { Badge, Timeline, Button } from 'flowbite-react';
import { HiCalendar } from 'react-icons/hi';
import clsx from 'clsx';
import { FC } from 'react';
import { getTextColorNovaGroupColor } from '@/utils/globalUtils';
import CardDynamic from '@/components/cardDynamic';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ICardDetailProps {
  dataProduct: ApiResponseDetail;
  setOpenModalNutriments: (value: boolean) => void;
  setOpenModalNutriscore: (value: boolean) => void;
  isLoadingCardDetail: boolean;
}

const cardDetail: FC<ICardDetailProps> = ({
  dataProduct,
  setOpenModalNutriments,
  setOpenModalNutriscore,
  isLoadingCardDetail,
}) => {
  const navigate = useNavigate();
  const styleCustomBadgeOrange =
    'bg-orange-500 text-white-800 group-hover:bg-orange-200 dark:bg-orange-200 dark:text-cyan-800 dark:group-hover:bg-orange-300';

  if (isLoadingCardDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 py-8 lg:rounded sm:rounded-none ">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className=" text-center rounded-lg  dark:bg-gray-700 mb-4">
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={1}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex -mx-2 mb-4">
                  <div className="w-1/2 px-2">
                    <Skeleton
                      className="animate-pulse rounded-md"
                      count={1}
                      width={90}
                      height={45}
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={1}
                    width={250}
                  />
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={1}
                    width={200}
                  />
                </p>
                <div className=" mb-4">
                  <div className="flex flex-col lg:flex-row">
                    <div>
                      <Skeleton
                        className="animate-pulse rounded-md mr-4"
                        count={2}
                        width={90}
                      />
                    </div>
                    <div>
                      <Skeleton
                        className="animate-pulse rounded-md"
                        count={2}
                        width={90}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={1}
                    width={110}
                  />
                  <div className="flex items-center mt-2">
                    <Skeleton
                      className="animate-pulse rounded-md"
                      count={1}
                      width={90}
                    />
                  </div>
                </div>
                <div className="mb-5 ">
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={1}
                    width={90}
                  />
                  <Skeleton
                    className="animate-pulse rounded-md"
                    count={2}
                    width={250}
                  />
                </div>
                <div>
                  <div className="sm:flex-none lg:flex">
                    <Skeleton
                      className="animate-pulse rounded-md"
                      count={1}
                      width={90}
                      height={45}
                    />
                    <Skeleton
                      className="animate-pulse rounded-md"
                      count={1}
                      width={90}
                      height={45}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dataProduct || !dataProduct.product) {
    return (
      <CardDynamic
        title="Data Not Available"
        body="Data Not Available"
        buttonText="Go back Home"
        onClick={() => navigate('/')}
      />
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 dark:bg-gray-800 py-8 lg:rounded sm:rounded-none ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="flex justify-center rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className=" h-full object-cover"
                  src={
                    dataProduct?.product.image_url ||
                    '/src/assets/image_not_available.png'
                  }
                  alt={dataProduct?.product.product_name}
                  loading="lazy"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <Button color="blue" onClick={() => navigate(-1)}>
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {dataProduct?.product.product_name || 'Name not available'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {parse(
                  (dataProduct?.product
                    .ingredients_text_with_allergens_en as string) || 'No data'
                ) || 'No data'}
              </p>
              <div className=" mb-4">
                <div className="flex flex-col lg:flex-row">
                  <div>
                    <div className="mr-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                        Fat:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {dataProduct?.product.nutrient_levels.fat || '-'}
                      </span>
                    </div>
                    <div className="mr-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                        Salt:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {dataProduct?.product.nutrient_levels.salt || '-'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mr-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                        Saturated:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {dataProduct?.product.nutrient_levels[
                          'saturated-fat'
                        ] || '-'}
                      </span>
                    </div>
                    <div className="mr-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300 mr-1">
                        Sugars:
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {dataProduct?.product.nutrient_levels.sugars || '-'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Nova Group tags:
                </span>
                <div className="flex items-center mt-2">
                  {dataProduct?.product.nova_groups_tags.map((nova, index) => (
                    <Badge
                      key={index}
                      className={clsx(
                        nova === 'en:3-processed-foods'
                          ? styleCustomBadgeOrange
                          : ''
                      )}
                      color={getTextColorNovaGroupColor(nova)}
                    >
                      {nova || '-'}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mb-5 ">
                <h1 className="font-bold text-gray-700 dark:text-gray-300 mb-5">
                  Nutri Score
                </h1>
                <Timeline horizontal className="ml-3">
                  <Timeline.Item className="w-8/12">
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                      <Timeline.Time>2021</Timeline.Time>
                      <Timeline.Title>
                        Grade : {dataProduct?.product.nutriscore[2023].grade}
                        <br /> Score :{' '}
                        {dataProduct?.product.nutriscore[2021].score}
                      </Timeline.Title>
                    </Timeline.Content>
                  </Timeline.Item>
                  <Timeline.Item className="w-8/12">
                    <Timeline.Point icon={HiCalendar} />
                    <Timeline.Content>
                      <Timeline.Time>2023</Timeline.Time>
                      <Timeline.Title>
                        Grade : {dataProduct?.product.nutriscore[2023].grade}
                        <br /> Score :{' '}
                        {dataProduct?.product.nutriscore[2021].score}
                      </Timeline.Title>
                    </Timeline.Content>
                  </Timeline.Item>
                </Timeline>
              </div>
              <div>
                <div className="sm:flex-none lg:flex">
                  <Button
                    className="mb-3 lg:mr-3 lg:mb-0"
                    onClick={() => setOpenModalNutriments(true)}
                  >
                    Open to see Nutriments
                  </Button>
                  <Button onClick={() => setOpenModalNutriscore(true)}>
                    Open to see Nustriscore Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cardDetail;
