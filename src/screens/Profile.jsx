import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import NiButton from '../components/form/Button';
import screensStyle from '../styles/screens.style';
import { Context as AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={screensStyle.container}>
      <Text style={screensStyle.title}>Mon profil</Text>
      <NiButton caption="Déconnexion" onPress={signOut} />
    </View>
  );
};

export default Profile;
