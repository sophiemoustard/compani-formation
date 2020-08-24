import React, { useContext } from 'react';
import { Text, ScrollView } from 'react-native';
import NiButton from '../components/form/Button';
import commonStyles from '../styles/common';
import { Context as AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Mon profil</Text>
      <NiButton caption="Déconnexion" onPress={signOut} />
    </ScrollView>
  );
};

export default Profile;
