import { useState, useEffect } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getAllFoodFacts } from '@/services/foodFactsServices';
import { TextInput } from 'flowbite-react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useDebounce } from 'use-debounce';
import { ApiResponse } from '@/interfaces/globalInterfaces';
import CardList from '@/components/cardList';
import SidebarLayout from '@/layout/sidebarLayout';
import CardDynamic from '@/components/cardDynamic';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { page: queryPage = '1', searchCategories: querySearch = '' } =
    queryString.parse(location.search);

  const [page, setPage] = useState<number>(
    parseInt(queryPage as string, 10) || 1
  );
  const [searchCategoriesTag, setSearchCategoriesTag] = useState<string>(
    querySearch as string
  );

  const [debouncedSearch] = useDebounce(searchCategoriesTag, 500);

  const { data, isLoading, isError, error, refetch } = useQuery<
    ApiResponse,
    Error
  >({
    queryKey: ['getAllFoodFacts', debouncedSearch, page],
    queryFn: () => getAllFoodFacts(debouncedSearch, page),
    keepPreviousData: true,
    retry: 1,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions<ApiResponse, Error>);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategoriesTag(event.target.value);
    navigate(`?page=1&searchCategories=${event.target.value}`);
  };

  const handlePageClick = (data: number) => {
    setPage(data);
    navigate(`?page=${data}&searchCategories=${searchCategoriesTag}`);
  };

  if (isError) {
    <CardDynamic
      title="Error page"
      body={error.message}
      buttonText="Retry"
      onClick={refetch}
    />;
  }

  useEffect(() => {
    document.title = 'Home - My Food Facts';
  }, []);

  return (
    <SidebarLayout>
      <div className="w-full px-5">
        <div className="text-center mb-4">
          <h1 className="mb-4 my-8 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
            Welcome to My Food Fact!{' '}
          </h1>
          <p className="my-5 text-lg font-normal text-gray-400 lg:text-xl">
            Discover fascinating facts about your favorite food categories like
            fruits, water, and more. Explore and learn something new today!
          </p>
        </div>
        <div className="flex items-center justify-center mb-5">
          <TextInput
            type="text"
            className="w-1/2"
            value={searchCategoriesTag}
            onChange={handleSearchChange}
            placeholder="Type and search, for example: Food"
            sizing="lg"
          />
        </div>

        <CardList
          dataProduct={data as ApiResponse}
          isLoadingDataProducts={isLoading}
          isErrorDataProducts={isError}
          currentPagePagination={queryPage as string}
          onPageChangePagination={handlePageClick}
        />
      </div>
    </SidebarLayout>
  );
};

export default Home;
