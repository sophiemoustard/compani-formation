// @ts-nocheck

import { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/NavigationType';
import { ActionWithoutPayloadType } from '../../types/store/StoreType';
import NiInput from '../../components/form/Input';
import NiSecondaryButton from '../../components/form/SecondaryButton';
import NiPrimaryButton from '../../components/form/PrimaryButton';
import NiErrorMessage from '../../components/ErrorMessage';
import FirstConnectionModal from '../../components/FirstConnectionModal';
import { AuthContextType, Context as AuthContext } from '../../context/AuthContext';
import commonStyles from '../../styles/common';
import styles from './styles';
import Actions from '../../store/actions';
import { isIOS } from '../../core/data/constants';

interface AuthenticationProps extends StackScreenProps<RootStackParamList> {
  resetAllReducers: () => void,
}

const Authentication = ({ navigation, resetAllReducers }: AuthenticationProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFirstConnection, setIsFirstConnection] = useState<boolean>(false);
  const { signIn, loading, error, errorMessage, resetError }: AuthContextType = useContext(AuthContext);

  useEffect(() => {
    resetAllReducers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPress = () => signIn({ email, password });
  const forgotPassword = () => {
    resetError();
    navigation.navigate('EmailForm', { firstConnection: false });
  };

  return (
    <SafeAreaView style={commonStyles.container} edges={['top']}>
      <ImageBackground style={{ ...styles.image }}
        source={require('../../../assets/images/authentication_background_image.jpg')}>
        <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={{ flex: 1 }}>
          <View style={styles.inner}>
            <Text style={styles.title}>
              Identifiez-vous pour{'\n'}accéder aux informations
            </Text>
            <NiInput caption="Email" value={email} onChangeText={value => setEmail(value.trim())} type="email"
              darkMode />
            <NiInput caption="Mot de passe" value={password} onChangeText={setPassword} type="password" darkMode />
            <TouchableOpacity style={styles.forgotPassword} onPress={forgotPassword} hitSlop={{ top: 12, bottom: 12 }}>
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <NiErrorMessage message={errorMessage} show={error} />
            <NiPrimaryButton customStyle={styles.button} caption="Se connecter" onPress={onPress} loading={loading} />
            <NiSecondaryButton caption="C'est ma première connexion" onPress={() => setIsFirstConnection(true)} />
            <FirstConnectionModal onRequestClose={() => setIsFirstConnection(false)} visible={isFirstConnection} />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  resetAllReducers: () => dispatch(Actions.resetAllReducers()),
});

export default connect(null, mapDispatchToProps)(Authentication);
