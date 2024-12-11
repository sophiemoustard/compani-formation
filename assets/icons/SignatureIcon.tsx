import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Svg, { Rect } from 'react-native-svg';
import { GREY } from '../../src/styles/colors';
import { ICON } from '../../src/styles/metrics';

const SignatureIcon = () => (
  <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <View style={{ height: 64, width: 64, justifyContent: 'center', alignItems: 'center' }}>
      <Feather name='pen-tool' size={ICON.LG} color={GREY[700]} />
    </View>
    <Rect width="64" height="64" rx="16" fill="#FCE68D"/>
    <Rect x="0.5" y="0.5" width="63" height="63" rx="15.5" stroke="#F4CA25"/>
  </Svg>
);

export default SignatureIcon;
