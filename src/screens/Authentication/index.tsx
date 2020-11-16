import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { NavigationType } from '../../types/NavigationType';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import NiErrorMessage from '../../components/ErrorMessage';
import { Context as AuthContext } from '../../context/AuthContext';
import styles from './styles';

interface AuthenticationProps {
  navigation: NavigationType,
}

const Authentication = ({ navigation }: AuthenticationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const { signIn, loading, error, errorMessage, resetError } = useContext(AuthContext);
  const isIOS = Platform.OS === 'ios';

  const onPress = () => signIn({ email, password });
  const forgotPassword = () => {
    resetError();
    navigation.navigate('ForgotPassword');
  };

  return (
    <ImageBackground
      style={{ ...styles.image, height: useWindowDimensions().height }}
      source={require('../../../assets/images/authentication_background_image.jpg')}
    >
      <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.inner}>
          <Text style={styles.title}>
            Identifiez-vous pour{'\n'}accéder aux informations
          </Text>
          <NiInput caption="Email" value={email} onChangeText={setEmail} type="email" darkMode={true} />
          <NiInput caption="Mot de passe" value={password}
            onChangeText={setPasssword} type="password" darkMode={true} />
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

export default Authentication;
