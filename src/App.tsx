import React, { lazy } from 'react';
import Login from './unauthenticatedApp/login';
import Index from 'screens/projectList';
import TestUseContext from './detailHook/testUseContext';
import './App.css';
import { useAuth } from 'context/auth-context';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';

// discard
// import { AuthenticatedApp } from 'authenticated-app';
// import { UnauthenticatedApp } from 'unauthenticatedApp';

const AuthenticatedApp = lazy(() => import('authenticated-app'));
const UnauthenticatedApp = lazy(() => import('unauthenticatedApp'));
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <Index/> */}
      {/* <Login /> */}
      {/* <TestUseContext/> */}

      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={<FullPageLoading/>}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
