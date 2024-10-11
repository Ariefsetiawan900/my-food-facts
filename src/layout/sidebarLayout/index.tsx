import { Fragment, ReactNode, FC, useState } from 'react';
import {
  TextInput,
  Button,
  Drawer,
  Label,
  Textarea,
  Modal,
} from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaRegSmileBeam } from 'react-icons/fa';
import { isValidInput } from '@/utils/globalUtils';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface SidebarLayoutProps {
  children: ReactNode;
}
const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const getUsername = localStorage.getItem('username');

  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(false);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false);
  const [inputSearchSidebar, setInputSearchSidebar] = useState<string>('');

  const handleSearchSidebar = () => {
    window.location.href = `/?page=1&searchCategories=${inputSearchSidebar}`;
    setIsOpenSidebar(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
  };

  return (
    <Fragment>
      <div
        className="fixed top-4 left-4"
        onClick={() => setIsOpenSidebar(!isOpenSidebar)}
      >
        <Button>Click Me</Button>
      </div>
      {children}

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
            <div className='border-b-4 border-blue-500 mb-5'>
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
                <Button
                  disabled={!isValidInput(inputSearchSidebar, 1)}
                  className="w-full"
                  onClick={handleSearchSidebar}
                >
                  Click and Search
                </Button>
              </div>
            </div>

            <form className="border-b-4 border-blue-500 mb-5 pb-5">
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
              <Button
                color="failure"
                fullSized
                onClick={() => setIsOpenModalLogout(true)}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>

{/* Modal Logout */}
      <Modal
        show={isOpenModalLogout}
        size="md"
        onClose={() => setIsOpenModalLogout(!isOpenModalLogout)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle size={20} className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to log out?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleLogout}>
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={() => setIsOpenModalLogout(!isOpenModalLogout)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default SidebarLayout;
