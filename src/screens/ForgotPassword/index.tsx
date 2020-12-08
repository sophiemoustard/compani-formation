import React, { useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { NavigationType } from '../../types/NavigationType';
import Authentication from '../../api/authentication';
import NiInput from '../../components/form/Input';
import NiButton from '../../components/form/Button';
import NiErrorMessage from '../../components/ErrorMessage';
import commonStyles from '../../styles/common';
import { WHITE, PINK } from '../../styles/colors';
import styles from './styles';

interface ForgotPasswordProps {
  navigation: NavigationType,
}

const ForgotPassword = ({ navigation }: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(false);
  const isIOS = Platform.OS === 'ios';

  const sendEmail = async () => {
    if (!email) return;

    setLoading(true);
    setError(false);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      await Authentication.forgotPassword({ email });
      setSuccessMessage('Un email a été envoyé à l\'adresse indiquée ! Redirection ...');
      setTimeout(goBack, 2000);
    } catch (e) {
      setError(true);
      setErrorMessage('Erreur lors de la réinitialisation de votre mot de passe.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => { navigation.navigate('Authentication'); };

  return (
    <KeyboardAvoidingView style={commonStyles.container} behavior={isIOS ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ require('../../../assets/images/compani_logo.png') } />
        </View>
        <Text>Entrez votre email pour réinitialiser votre mot de passe.</Text>
        <NiInput caption="Email" value={email} onChangeText={setEmail} type="email" />
        <NiErrorMessage message={errorMessage} show={error} />
        {successMessage !== '' && <Text style={styles.success}>{successMessage}</Text>}
        <View style={styles.buttonContainer}>
          <NiButton style={styles.button} caption="Retour" onPress={goBack} bgColor={WHITE}
            color={PINK[500]} borderColor={PINK[500]} />
          <NiButton style={styles.button} caption="Envoyer" onPress={sendEmail} loading={loading} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
