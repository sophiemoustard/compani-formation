import React from 'react';
import { View } from 'react-native';
import { GREY } from '../../styles/colors';
import { BORDER_RADIUS } from '../../styles/metrics';
import { shadowStyle } from './style';

interface ShadowProps {
  backgroundColor?: string,
  borderRadius?: number,
}

// You should add relative position on parent container
const Shadow = ({ backgroundColor = GREY[200], borderRadius = BORDER_RADIUS.SM }: ShadowProps) => (
  <View style={shadowStyle(backgroundColor, borderRadius).shadow} />
);

export default Shadow;
