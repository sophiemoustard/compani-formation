import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BORDER_RADIUS, MARGIN, PADDING, INPUT_HEIGHT, BORDER_WIDTH } from '../../styles/metrics';
import { GREY_200, WHITE } from '../../styles/colors';

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
    borderWidth: BORDER_WIDTH,
    borderColor: GREY_200,
    height: INPUT_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING.MD,
    borderRadius: BORDER_RADIUS.MD,
  },
  text: {
    marginBottom: MARGIN.XS,
  },
  inputIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  }
});

export default NiInput;
