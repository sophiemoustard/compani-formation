import React, { useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import { Context as AuthContext } from '../context/AuthContext';
import screensStyle from '../styles/screens.style';

const AuthenticationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const { signIn } = useContext(AuthContext);
  const isIOS = Platform.OS == 'ios';

  return (
    <KeyboardAvoidingView style={[styles.container, screensStyle.container]} behavior={isIOS ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email" />
        <NiInput style={styles.input} caption="Mot de passe" value={password} onChangeText={setPasssword}
          type="password" />
        <NiButton style={styles.button} caption="Connexion" onPress={() => signIn({ email, password })} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
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
