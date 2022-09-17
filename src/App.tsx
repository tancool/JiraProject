import React from 'react';
import Login from './unauthenticatedApp/login';
import Index from 'screens/projectList';
import './App.css';
import { useAuth } from 'context/auth-context';
import { AuthenticatedApp } from 'authenticated-app';
import { UnauthenticatedApp } from 'unauthenticatedApp';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallback } from 'components/lib';
function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <Index/> */}
      {/* <Login /> */}

      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
