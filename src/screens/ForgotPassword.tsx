import React, { useState } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { navigationType } from 'types/NavigationType';
import Users from '../api/users';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import commonStyles from '../styles/common';
import { MARGIN, PADDING } from '../styles/metrics';
import { GREEN, WHITE, PINK } from '../styles/colors';

interface ForgotPasswordScreenProps {
  navigation: navigationType,
}

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
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
      await Users.forgotPassword({ email });
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
          <Image style={styles.image} source={ require('../../assets/compani_logo.png') } />
        </View>
        <Text>Entrez votre email pour réinitialiser votre mot de passe.</Text>
        <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email" />
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

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: MARGIN.XXL,
  },
  image: {
    width: 160,
    height: 30,
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    paddingHorizontal: PADDING.XL,
    justifyContent: 'center',
  },
  input: {
    marginVertical: MARGIN.SM,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  success: {
    color: GREEN[500],
    marginBottom: MARGIN.SM,
  },
});

export default ForgotPasswordScreen;
