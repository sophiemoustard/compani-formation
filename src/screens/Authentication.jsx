import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Image, Text } from 'react-native';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import { Context as AuthContext } from '../context/AuthContext';
import screensStyle from '../styles/screens.style';

const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn } = useContext(AuthContext);
  const isIOS = Platform.OS == 'ios';

  const onPress = async () => {
    try {
      setLoading(false);
      setError(true);
      setErrorMessage('');
      await signIn(email, password);
    } catch (e) {
      if (e.response.status === 400) setErrorMessage('L\'email et/ou le mot de passe est incorrect.');
      else setErrorMessage('Impossible de se connecter');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={screensStyle.container} behavior={isIOS ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ require('../../assets/compani_logo.png') } />
        </View>
        <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email" />
        <NiInput style={styles.input} caption="Mot de passe" value={password} onChangeText={setPasssword}
          type="password" />
        <NiErrorMessage message={ errorMessage }  show={ error } />
        <NiButton style={styles.button} caption="Connexion" onPress={() => onPress()}
          disabled={loading} />
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
