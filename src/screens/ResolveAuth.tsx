import { useEffect, useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuth = () => {
  const { tryLocalSignIn } = useContext(AuthContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { tryLocalSignIn(); }, []);
  return null;
};

export default ResolveAuth;
