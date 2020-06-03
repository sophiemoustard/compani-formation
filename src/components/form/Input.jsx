import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NiInput = ({ style, value, onChangeText, caption, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const autoCapitalize = ['password', 'email'].includes(type) ? 'none' : 'sentences';
  const keyboradType = type === 'email' ? 'email-address' : 'default';
  const showPasswordIcon = showPassword ? 'eye' : 'eye-off';
  const secureTextEntry = isPassword && !showPassword;
  const togglePassword = () => { setShowPassword(!showPassword) }
  const inputStyle = isPassword ? { ...styles.input, paddingRight: 30 } : styles.input;

  return (
    <View style={style}>
      <Text style={styles.text}>{caption}</Text>
      <View>
        <TextInput value={value} onChangeText={onChangeText} style={inputStyle} secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize} keyboardType={keyboradType} />
        {isPassword &&
          <TouchableOpacity style={styles.inputIcon} onPress={togglePassword}>
            <MaterialCommunityIcons name={showPasswordIcon} size={20} />
          </TouchableOpacity>}
      </View>
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
  inputIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  }
});

export default NiInput;
