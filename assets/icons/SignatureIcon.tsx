import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { GREY } from '../../src/styles/colors';
import { ICON } from '../../src/styles/metrics';

interface SignatureIconProps {
  customStyle?: object,
}

const SignatureIcon = ({ customStyle } : SignatureIconProps) => (
  <View style={customStyle}>
    <Feather name='pen-tool' size={ICON.LG} color={GREY[700]} />
  </View>
);

export default SignatureIcon;
