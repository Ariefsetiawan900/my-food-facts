import { create } from 'zustand';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

// const location = useLocation();

// const { page: queryPage = '1', searchCategories: querySearch = '' } =
//   queryString.parse(location.search);

interface IFoodFactsStore {
  globalState: {
    searchCategoriesTag: string;
    page: number;
  };
  handleGlobalState: (key: string, value: string | number) => void;
}

const myFoodFactsStore = create<IFoodFactsStore>((set) => ({
  globalState: {
    searchCategoriesTag: '',
    page: 1,
  },
  handleGlobalState: (key, value) => {
    set((state) => ({
      globalState: {
        ...state.globalState,
        [key]: value,
      },
    }));
  },
}));

export default myFoodFactsStore;
