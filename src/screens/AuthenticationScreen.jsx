import React, { useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import Users from '../api/users';

const AuthenticationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const logIn = async () => {
    try {
      if (!email || !password) alert('Informations manquantes');
      const authentication = await Users.authenticate({ email, password });
      await AsyncStorage.setItem('token', authentication.token);
      navigation.navigate('CourseList')
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <NiInput style={styles.input} caption="Email" value={email} onChangeText={setEmail} />
      <NiInput style={styles.input} caption="Mot de passe" value={password} onChangeText={setPasssword} />
      <NiButton style={styles.button} caption="Connexion" onPress={logIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
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
  }
});

export default AuthenticationScreen;
