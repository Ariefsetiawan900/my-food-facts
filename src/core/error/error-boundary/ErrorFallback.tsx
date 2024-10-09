import React from 'react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-semibold text-red-600">Oops! Something went wrong.</h2>
      <p className="text-gray-600 mt-2">Error: {error.message}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorFallback;
