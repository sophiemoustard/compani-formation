import React from 'react';
import { View } from 'react-native';
import { shadowCommonStyle } from '../../styles/shadowCommonStyle';

interface ShadowProps {
  customStyle?: any,
}

// You should add relative position on parent container
const Shadow = ({
  customStyle,
}: ShadowProps) => {
  const relativePosition = { top: 0, bottom: -3, left: 0, right: 0 };
  const style = shadowCommonStyle(customStyle, relativePosition);
  return <View style={ [style.shadow, customStyle] } />;
};

export default Shadow;
