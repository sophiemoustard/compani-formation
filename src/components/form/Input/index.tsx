import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GREY, WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import styles from './styles';
import Shadow from '../../design/Shadow';

interface InputProps {
  customStyle?: any,
  value: string,
  onChangeText: (string) => void,
  caption: string,
  type: string,
  darkMode?: boolean,
}

const Input = ({ customStyle, value, onChangeText, caption, type, darkMode }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const isPassword = type === 'password';
  const autoCapitalize = ['password', 'email'].includes(type) ? 'none' : 'sentences';
  const keyboradType = type === 'email' ? 'email-address' : 'default';
  const showPasswordIcon = showPassword ? 'eye' : 'eye-off';
  const secureTextEntry = isPassword && !showPassword;
  const togglePassword = () => { setShowPassword(previousShowPassword => !previousShowPassword); };
  const style = styles(isSelected, customStyle?.borderColor || GREY[200]);
  const textStyle = { ...style.text };
  const inputStyle = { ...style.input };
  if (darkMode) {
    inputStyle.backgroundColor = WHITE;
    textStyle.color = WHITE;
  }

  return (
    <>
      <Text style={textStyle}>{caption}</Text>
      <View style={customStyle?.container}>
        <View style={inputStyle}>
          <TextInput value={value} onChangeText={onChangeText} onTouchStart={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)} testID={caption} secureTextEntry={secureTextEntry}
            style={style.innerInput} autoCapitalize={autoCapitalize} keyboardType={keyboradType} />
          {isPassword &&
          <TouchableOpacity style={style.inputIcon} onPress={togglePassword}>
            <Feather name={showPasswordIcon} size={ICON.XS} />
          </TouchableOpacity>}
        </View>
        {isSelected && <Shadow customStyle={style.shadow} /> }
      </View>
    </>
  );
};

export default Input;
