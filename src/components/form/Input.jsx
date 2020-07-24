import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WHITE } from '../../styles/variables';

const NiInput = ({ style, value, onChangeText, caption, type, darkMode }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const autoCapitalize = ['password', 'email'].includes(type) ? 'none' : 'sentences';
  const keyboradType = type === 'email' ? 'email-address' : 'default';
  const showPasswordIcon = showPassword ? 'eye' : 'eye-off';
  const secureTextEntry = isPassword && !showPassword;
  const togglePassword = () => { setShowPassword(showPassword => !showPassword); };
  const textStyle = { ...styles.text };
  const inputStyle = { ...styles.input };
  if (isPassword) inputStyle.paddingRight = 30;
  if (darkMode) {
    inputStyle.backgroundColor = WHITE;
    textStyle.color = WHITE;
  }

  return (
    <View style={style}>
      <Text style={textStyle}>{caption}</Text>
      <View>
        <TextInput value={value} onChangeText={onChangeText} testID={caption} secureTextEntry={secureTextEntry}
          style={inputStyle} autoCapitalize={autoCapitalize} keyboardType={keyboradType} />
        {isPassword &&
          <TouchableOpacity style={styles.inputIcon} onPress={togglePassword}>
            <MaterialCommunityIcons name={showPasswordIcon} size={20} />
          </TouchableOpacity>}
      </View>
    </View>
  );
};

NiInput.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  caption: PropTypes.string,
  type: PropTypes.string,
  darkMode: PropTypes.bool,
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D0D0D0',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 16,
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
