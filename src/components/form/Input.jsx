import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

const NiInput = ({ style, value, onChangeText, caption }) => {
  return (
    <View style={style}>
      <Text style={styles.text}>{caption}</Text>
      <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
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
