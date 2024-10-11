import { Fragment, ReactNode, FC, useState } from 'react';
import {
  TextInput,
  Pagination,
  Button,
  Drawer,
  Label,
  Textarea,
} from 'flowbite-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegSmileBeam } from 'react-icons/fa';

interface SidebarLayoutProps {
  children: ReactNode;
}
const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
const navigate = useNavigate()
const getUsername = localStorage.getItem('username');

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [inputSearchSidebar, setInputSearchSidebar] = useState<string>('');

  const handleSearchSidebar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // setSearchCategoriesTag(inputSearchSidebar);
    navigate(`?page=1&searchCategories=${inputSearchSidebar}`);
    setIsOpenSidebar(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('username'); // Hapus user dari localStorage
    navigate('/login'); // Redirect ke halaman login
  };

  return (
    <Fragment>
      <div
        className="fixed top-4 left-4"
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        <Button>Click Me</Button>
      </div>
      <Fragment>{children}</Fragment>

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
    </Fragment>
  );
};

export default SidebarLayout;
