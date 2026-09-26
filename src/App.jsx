import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';

function App() {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    if (publishableKey && isLoaded && !isSignedIn) {
      navigate('/auth/sign-in');
    }
  }, [isLoaded, isSignedIn, publishableKey, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
