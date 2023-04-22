/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from 'src/firebaseConfigFile';

function AuthGuard({ children }) {
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push('src\views\pages\login\Login.js');
      }
    });

    return unsubscribe;
  }, [history]);

  return children;
}

export default AuthGuard;
