import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import styles from './styles';

interface InputProps {
  style?: object,
  value: string,
  onChangeText: (string) => void,
  caption: string,
  type: string,
  darkMode?: boolean,
}

const Input = ({ style, value, onChangeText, caption, type, darkMode }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const autoCapitalize = ['password', 'email'].includes(type) ? 'none' : 'sentences';
  const keyboradType = type === 'email' ? 'email-address' : 'default';
  const showPasswordIcon = showPassword ? 'eye' : 'eye-off';
  const secureTextEntry = isPassword && !showPassword;
  const togglePassword = () => { setShowPassword(previousShowPassword => !previousShowPassword); };
  const textStyle = { ...styles.text };
  const inputStyle = { ...styles.input };
  if (darkMode) {
    inputStyle.backgroundColor = WHITE;
    textStyle.color = WHITE;
  }

  return (
    <View style={style}>
      <Text style={textStyle}>{caption}</Text>
      <View style={inputStyle}>
        <TextInput value={value} onChangeText={onChangeText} testID={caption} secureTextEntry={secureTextEntry}
          style={styles.innerInput} autoCapitalize={autoCapitalize} keyboardType={keyboradType} />
        {isPassword &&
          <TouchableOpacity style={styles.inputIcon} onPress={togglePassword}>
            <Feather name={showPasswordIcon} size={ICON.XS} />
          </TouchableOpacity>}
      </View>
    </View>
  );
};

export default Input;
