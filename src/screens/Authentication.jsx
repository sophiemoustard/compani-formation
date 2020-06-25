import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Image, Text } from 'react-native';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import { Context as AuthContext } from '../context/AuthContext';
import screensStyle from '../styles/screens.style';
import getEnvVars from '../../environment';
import Constants from 'expo-constants';

const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const { signIn } = useContext(AuthContext);
  const isIOS = Platform.OS == 'ios';

  return (
    <KeyboardAvoidingView style={screensStyle.container} behavior={isIOS ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ require('../../assets/compani_logo.png') } />
          <Text>{Constants.manifest.releaseChannel}</Text>
          <Text>{getEnvVars().baseURL}</Text>
        </View>
        <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email" />
        <NiInput style={styles.input} caption="Mot de passe" value={password} onChangeText={setPasssword}
          type="password" />
        <NiButton style={styles.button} caption="Connexion" onPress={() => signIn({ email, password })} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center'
  },
  image: {
    width: 160,
    height: 30,
    alignItems: 'center'
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AuthenticationScreen;
