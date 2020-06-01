import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const NiInput = ({ style, value, onChangeText, caption, type }) => {
  const isPassword = type === 'password';
  const autoCapitalize = ['password', 'email'].includes(type) ? 'none' : 'sentences';
  const keyboradType = type === 'email' ? 'email-address' : 'default';

  return (
    <View style={style}>
      <Text style={styles.text}>{caption}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={isPassword}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboradType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    marginBottom: 4,
  },
});

export default NiInput;
