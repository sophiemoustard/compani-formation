import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import styles from './styles';
import Shadow from '../../design/Shadow';

interface InputProps {
  value: string,
  onChangeText: (string) => void,
  caption: string,
  type: string,
  darkMode?: boolean,
  validationMessage?: string,
  autoFocus?: boolean,
}

const Input = ({
  value,
  onChangeText,
  caption,
  type,
  darkMode,
  validationMessage = '',
  autoFocus = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const isPassword = type === 'password';
  const autoCapitalize = ['password', 'email'].includes(type) ? 'none' : 'sentences';
  const keyboradType = type === 'email' ? 'email-address' : 'default';
  const showPasswordIcon = showPassword ? 'eye' : 'eye-off';
  const secureTextEntry = isPassword && !showPassword;
  const togglePassword = () => { setShowPassword(previousShowPassword => !previousShowPassword); };
  const style = styles(isSelected);
  const textStyle = darkMode ? { ...style.text, color: WHITE } : { ...style.text };

  return (
    <>
      <Text style={textStyle}>{caption}</Text>
      <View style={style.container}>
        <View style={style.input}>
          <TextInput value={value} onChangeText={onChangeText} onTouchStart={() => setIsSelected(true)}
            onBlur={() => setIsSelected(false)} testID={caption} secureTextEntry={secureTextEntry}
            style={style.innerInput} autoCapitalize={autoCapitalize} keyboardType={keyboradType}
            autoFocus={autoFocus} />
          {isPassword &&
          <TouchableOpacity style={style.inputIcon} onPress={togglePassword}>
            <Feather name={showPasswordIcon} size={ICON.XS} />
          </TouchableOpacity>}
        </View>
        {isSelected && <Shadow customStyle={style.shadow} /> }
      </View>
      <Text style={style.unvalid}>{validationMessage}</Text>
    </>
  );
};

export default Input;
