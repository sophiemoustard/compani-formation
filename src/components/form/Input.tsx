import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BORDER_RADIUS, MARGIN, PADDING, INPUT_HEIGHT, BORDER_WIDTH, ICON } from '../../styles/metrics';
import { GREY, WHITE } from '../../styles/colors';
import { FIRA_SANS_REGULAR } from '../../styles/fonts';

const NiInput = ({ style, value, onChangeText, caption, type, darkMode }) => {
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
    borderColor: GREY[200],
    height: INPUT_HEIGHT,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.MD,
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    ...FIRA_SANS_REGULAR.SM,
    marginBottom: MARGIN.XS,
  },
  inputIcon: {
    paddingRight: PADDING.MD,
  },
  innerInput: {
    ...FIRA_SANS_REGULAR.MD,
    flex: 1,
    paddingHorizontal: PADDING.MD,
  },
});

export default NiInput;
