import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../modules/shared/utils/firebace';

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const signup = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };
  const authContextProviderValue = useMemo(() => ({ user, signup, login, logout }), [user]);

  return <AuthContext.Provider value={authContextProviderValue}>{isLoading ? null : children}</AuthContext.Provider>;
};
