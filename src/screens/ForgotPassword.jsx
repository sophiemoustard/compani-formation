import React, { useState } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Proptypes from 'prop-types';
import Users from '../api/users';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import NiErrorMessage from '../components/ErrorMessage';
import screensStyle from '../styles/screens.style';
import variables from '../styles/variables';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const isIOS = Platform.OS == 'ios';

  const sendEmail = async () =>  {
    setLoading(true);
    setError(false);
    setErrorMessage('');
    try {
      if (!email) return;
      await Users.forgotPassword({ email });
      goBack();
    } catch (e) {
      setError(true);
      setErrorMessage('Erreur lors de la reinitialisation de votre mot de passe.');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => { navigation.navigate('Authentication'); };

  return (
    <KeyboardAvoidingView style={screensStyle.container} behavior={isIOS ? 'padding' : 'height'}>
      <View style={styles.inner}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ require('../../assets/compani_logo.png') } />
        </View>
        <Text>Entrez votre email pour réinitialiser votre mot de passe.</Text>
        <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} type="email" />
        <NiErrorMessage message={errorMessage} show={error} />
        <View style={styles.buttonContainer}>
          <NiButton style={styles.button} caption="Envoyer" onPress={sendEmail} loading={loading} />
          <NiButton style={styles.button} caption="Retour" onPress={goBack} bgColor={variables.WHITE}
            color={variables.PRIMARY_COLOR} />  
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

ForgotPasswordScreen.propTypes = {
  navigation: Proptypes.object,
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 50,
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
});

export default ForgotPasswordScreen;
