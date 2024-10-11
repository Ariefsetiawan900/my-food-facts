import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';
import { isValidInput } from '@/utils/globalUtils';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login - My Food Facts';
    const isAuthenticated = !!localStorage.getItem('username');
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidInput(username)) {
      setIsSubmitting(true);

      setTimeout(() => {
        localStorage.setItem('username', username);
        setIsSubmitting(false);

        navigate('/', { replace: true });
      }, 2000);
    }
  };

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-4xl font-bold text-center  mb-8">
          Welcome to My Food Facts App
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username" value="Username" />
            <TextInput
              id="username"
              type="text"
              placeholder="Your Username"
              //   required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Button
              type="submit"
              fullSized
              disabled={!isValidInput(username) || isSubmitting}
              isProcessing={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
