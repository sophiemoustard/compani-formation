// @ts-nocheck

import { useEffect, useContext } from 'react';
import { AuthContextType, Context as AuthContext } from '../context/AuthContext';

const ResolveAuth = () => {
  const { tryLocalSignIn }: AuthContextType = useContext(AuthContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);
  return null;
};

export default ResolveAuth;
