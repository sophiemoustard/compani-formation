import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import NiInput from '../components/form/Input';
import NiButton from '../components/form/Button';
import { Context as AuthContext } from '../context/AuthContext';

const AuthenticationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NiInput
        style={styles.input}
        caption="Email"
        value={email}
        onChangeText={setEmail}
        type="email"
      />
     <NiInput
        style={styles.input}
        caption="Mot de passe"
        value={password}
        onChangeText={setPasssword}
        type="password"
      />
     <NiButton style={styles.button} caption="Connexion" onPress={() => signIn({ email, password })} />
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
