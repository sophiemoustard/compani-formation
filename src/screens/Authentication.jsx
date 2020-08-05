import React, { useState, useContext } from 'react';
import {
  Text,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import { Context as AuthContext } from '../context/AuthContext';
import { WHITE } from '../styles/variables';
import { MARGIN } from '../styles/metrics';

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
    <ImageBackground
      style={{...styles.image, height: useWindowDimensions().height}}
      source={require('../../assets/authentication_background_image.jpg')}
    >
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={{ flex: 1 }}>
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
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

AuthenticationScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
  },
  inner: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: WHITE,
    marginBottom: MARGIN.XL,
  },
  input: {
    marginVertical: MARGIN.SM,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: MARGIN.SM,
  },
  forgotPasswordText: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    color: WHITE,
  },
  button: {
    marginTop: MARGIN.XL,
  },
});

export default AuthenticationScreen;
