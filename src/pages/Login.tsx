import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const isValidUsername = (name: string) => {
    return name.length >= 5 && name.length <= 50;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUsername(username)) {
      setIsSubmitting(true);

      setTimeout(() => {
        localStorage.setItem('username', username);
        setIsSubmitting(false);

        navigate('/');
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
            {/* <label className="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 rounded-lg border border-gray-400"
              id="email"
              name="email"
              type="email"
            /> */}
          </div>
          <div>
            <Button
              type="submit"
              fullSized
              disabled={!isValidUsername(username) || isSubmitting}
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
