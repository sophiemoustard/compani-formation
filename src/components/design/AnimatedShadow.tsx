import { Animated } from 'react-native';
import { shadowCommonStyle } from '../../styles/shadowCommonStyle';

interface AnimatedShadowProps {
  customStyle?: any,
}

// You should add relative position on parent container
const AnimatedShadow = ({ customStyle }: AnimatedShadowProps) => {
  const relativePosition = { top: 0, bottom: -3, left: 0, right: 0 };
  const style = shadowCommonStyle(customStyle, relativePosition);
  return <Animated.View style={[style.shadow, customStyle]} />;
};

export default AnimatedShadow;
