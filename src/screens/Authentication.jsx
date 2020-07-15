import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform, Image, TouchableOpacity, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import { Context as AuthContext } from '../context/AuthContext';
import screensStyle from '../styles/screens.style';
import { WHITE } from '../styles/variables'

const AuthenticationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const { signIn, loading, error, errorMessage, resetError } = useContext(AuthContext);
  const isIOS = Platform.OS == 'ios';

  const onPress = () =>  signIn({ email, password });
  const forgotPassword = () => {
    resetError();
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView style={screensStyle.container} behavior={isIOS ? 'padding' : 'height'}>
      <ImageBackground style={styles.image} source={ require('../../assets/authentication_background_image.jpg') }>
        <View style={styles.inner}>
          <Text style={styles.title}>
          Identifiez-vous pour{'\n'}accéder aux informations
          </Text>
          <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email"
            darkMode={true} />
          <NiInput style={styles.input} caption="Mot de passe" value={password} onChangeText={setPasssword}
            type="password" darkMode={true} />
          <TouchableOpacity style={styles.forgotPassword} onPress={forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          <NiErrorMessage message={errorMessage} show={error} />
          <NiButton style={styles.button} caption="Se connecter" onPress={onPress} loading={loading} />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

AuthenticationScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center'
  },
  inner: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: 30,
  },
  input: {
    marginVertical: 10,
    color: WHITE,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: WHITE,
  },
  button: {
    marginTop: 35,
  },
});

export default AuthenticationScreen;
