import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import { Context as AuthContext } from '../context/AuthContext';
import screensStyle from '../styles/screens.style';
import variables from '../styles/variables';

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
      setLoading(true);
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
        <NiErrorMessage message={errorMessage} show={error} />
        <View style={styles.buttonContainer}>
          <NiButton style={styles.button} caption="Connexion" onPress={() => onPress()}
            disabled={loading} />
          { loading && <ActivityIndicator style={styles.loading} animating={loading} color={variables.PRIMARY_COLOR} size="small"></ActivityIndicator>}
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loading: {
    marginLeft: 10,
  }
});

export default AuthenticationScreen;
