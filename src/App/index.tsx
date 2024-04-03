// @ts-nocheck
import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContextType, Context as AuthContext } from '../context/AuthContext';

const App = () => {
  const { companiToken }: AuthContextType = useContext(AuthContext);

  return (

    <>
      <Redirect href={companiToken ? 'home' : 'authentication'}/>
    </>
  );
};
export default App;
