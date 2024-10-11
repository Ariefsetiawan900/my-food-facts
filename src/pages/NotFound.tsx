import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('username');
  const handleButtonAuth = () => {
    if (isAuthenticated) {
      return navigate('/');
    }
    return navigate('/login');
  };
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <Button onClick={handleButtonAuth}>
          Back to {isAuthenticated ? 'Homepage' : 'Login page'}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
