import React from 'react';
import { View, Animated } from 'react-native';
import { PanGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import { PINK } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import FeatherButton from '../icons/FeatherButton';
import cardsStyle from '../../styles/cards';
import styles from './styles';

interface ZoomImageProps {
  image: { uri: string } |undefined,
  mediaHeight: number,
  setZoomImage: (value) => void,
}

const ZoomImage = ({
  image,
  mediaHeight,
  setZoomImage,
}: ZoomImageProps) => {
  const styleWithHeight = styles(mediaHeight);
  const scale = new Animated.Value(1);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const handlePinch = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: true });
  const handlePan = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styleWithHeight.container}>
      <FeatherButton name={'x-circle'} onPress={() => setZoomImage(false)} size={ICON.LG} color={PINK[500]}
        style={styleWithHeight.goBack} />
      <PanGestureHandler onGestureEvent={handlePan}>
        <Animated.View style={styleWithHeight.content}>
          {!!image &&
            <PinchGestureHandler onGestureEvent={handlePinch}>
              <Animated.Image source={image} style={[
                cardsStyle.media,
                styleWithHeight.media,
                { transform: [{ scale }, { translateX }, { translateY }] },
              ]}/>
            </PinchGestureHandler>
          }
        </Animated.View>
      </PanGestureHandler>
    </View>);
};

export default ZoomImage;
