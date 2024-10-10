import { Suspense } from 'react';
import { ErrorBoundary, ErrorFallback } from '@/core/error/error-boundary';
import { SplashScreen } from '@/core/splash-screen';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from './routing';

const App = () => {
  return (
    <ErrorBoundary
      fallback={
        <ErrorFallback
          error={new Error('Something went wrong')}
          resetErrorBoundary={() => window.location.reload()}
        />
      }
    >
      <Suspense fallback={<SplashScreen />}>
        <Router>
          <Routing />
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
