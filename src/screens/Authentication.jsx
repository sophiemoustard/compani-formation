import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import { Context as AuthContext } from '../context/AuthContext';
import screensStyle from '../styles/screens.style';
import variables from '../styles/variables';

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
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ require('../../assets/compani_logo.png') } />
        </View>
        <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email" />
        <NiInput style={styles.input} caption="Mot de passe" value={password} onChangeText={setPasssword}
          type="password" />
        <TouchableOpacity style={styles.forgotPassword} onPress={forgotPassword}>
          <Text style={styles.forgotPasswordText}>Mot de passe oublié</Text>
        </TouchableOpacity>
        <NiErrorMessage message={errorMessage} show={error} />
        <NiButton caption="Connexion" onPress={onPress} loading={loading} />
      </View>
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordText: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});

export default AuthenticationScreen;
