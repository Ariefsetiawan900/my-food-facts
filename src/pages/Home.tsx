import { useState } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { getAllFoodFacts } from '@/services/foodFactsServices';
import {
  TextInput,
  Pagination,
  Button,
  Drawer,
  Label,
  Textarea,
} from 'flowbite-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';
import { useDebounce } from 'use-debounce';
import { ApiResponse, IProduct } from '@/interfaces/globalInterfaces';
import CardList from '@/components/cardList';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaRegSmileBeam } from 'react-icons/fa';
import MyFoodFactsStore from '@/zustand/globalStore';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const {globalState,handleGlobalState}=MyFoodFactsStore()

  const getUsername = localStorage.getItem('username');

  const { page: queryPage = '1', searchCategories: querySearch = '' } =
    queryString.parse(location.search);
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputSearchSidebar, setInputSearchSidebar] = useState<string>('');

  const [page, setPage] = useState<number>(
    parseInt(queryPage as string, 10) || 1
  );
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [searchCategoriesTag, setSearchCategoriesTag] = useState<string>(
    querySearch as string
  );

  const [debouncedSearch] = useDebounce(searchCategoriesTag, 500);

  const {
    data,
    isLoading,
    //  isError, error, isFetching, refetch
  } = useQuery<ApiResponse, Error>({
    queryKey: ['getAllFoodFacts', debouncedSearch, page],
    queryFn: () => getAllFoodFacts(debouncedSearch, page),
    keepPreviousData: true,
  } as UseQueryOptions<ApiResponse, Error>);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategoriesTag(event.target.value);
    navigate(`?page=1&searchCategories=${event.target.value}`);
  };

  const handlePageClick = (data: any) => {
    setPage(data);
    navigate(`?page=${data}&searchCategories=${searchCategoriesTag}`);
  };

  const handleSearchSidebar = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    // setSearchCategoriesTag(inputSearchSidebar);
    // handleGlobalState('searchCategoriesTag',inputSearchSidebar)
    // navigate(`/detail/0909090`, {
    //   replace: true,
    // });
    window.history.pushState({}, '', '/?page=1&searchCategories=water');
    setIsOpenSidebar(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('username'); // Hapus user dari localStorage
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <>
      <div
        className="fixed top-4 left-4"
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        <Button>Click Me</Button>
      </div>

      <div className="w-full px-5">
        <div className="text-center mb-4">
          <h1 className="mb-4 my-8 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
            Welcome to My Food Fact!
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
          dataProduct={data?.products as IProduct[]}
          isLoadingDataProducts={isLoading}
        />

        <div className="flex overflow-x-auto sm:justify-center mt-10">
          {isLoading ? (
            <Skeleton
              className="animate-pulse rounded-md"
              count={1}
              width={400}
              height={45}
            />
          ) : (
            <Pagination
              currentPage={parseInt(queryPage as string, 10)}
              totalPages={Number(data?.count) || 100}
              onPageChange={handlePageClick}
              showIcons
            />
          )}
        </div>
      </div>

      <Drawer
        open={isOpenSidebar}
        onClose={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        <Drawer.Header
          title={`Hello, ${getUsername || '-'}`}
          titleIcon={FaRegSmileBeam}
        />
        <Drawer.Items>
          <div>
            <form onSubmit={() => handleSearchSidebar}>
              <div className="mb-6 mt-3">
                <Label htmlFor="search" className="mb-2 block">
                  Search Categories
                </Label>
                <TextInput
                  id="search"
                  name="search"
                  placeholder="example: Food"
                  type="text"
                  value={inputSearchSidebar}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInputSearchSidebar(e.target.value)
                  }
                />
              </div>
              <div className="mb-6">
                <Button type="submit" className="w-full">
                  Click and Search
                </Button>
              </div>
            </form>

            <form className="mb-8">
              <div>
                <h1 className="text-xl font-bold">Contact Us</h1>
                <h5 className="text-sm text-gray-500">
                  Need to get in touch with us? Either fill out the form with
                  your inquiry or find the departement email you'd like to
                  conatct below
                </h5>
              </div>
              <div className="mb-4 mt-3 flex gap-2">
                <div>
                  <Label htmlFor="firstName" className="mb-2 block">
                    First Name*
                  </Label>
                  <TextInput id="firstName" name="firstName" type="text" />
                </div>
                <div>
                  <Label htmlFor="lastName" className="mb-2 block">
                    Last Name*
                  </Label>
                  <TextInput id="lastName" name="lastName" type="text" />
                </div>
              </div>
              <div className="mb-3">
                <Label htmlFor="email" className="mb-2 block">
                  Email*
                </Label>
                <TextInput id="email" name="email" type="email" />
              </div>
              <div className="mb-3">
                <Label htmlFor="help" className="mb-2 block">
                  What can we help you with*
                </Label>
                <Textarea id="help" name="help" />
              </div>
              <div>
                <Button color="purple">Submit</Button>
              </div>
            </form>
            <div>
              <Button color="failure" fullSized onClick={handleLogout}>
                LOGOUT
              </Button>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
};

export default Home;
