import React from 'react';
import { View, Animated } from 'react-native';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { GREY } from '../../styles/colors';
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

  const handlePinch = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: true });

  return (
    <View style={styleWithHeight.container}>
      <FeatherButton name={'x-circle'} onPress={() => setZoomImage(false)} size={ICON.LG} color={GREY[600]}
        style={styleWithHeight.goBack} />
      <Animated.View style={styleWithHeight.content}>
        {!!image &&
        <PinchGestureHandler onGestureEvent={handlePinch}>
          <Animated.Image source={image} style={[cardsStyle.media, styleWithHeight.media, { transform: [{ scale }] }]}/>
        </PinchGestureHandler>}
      </Animated.View>
    </View>);
};

export default ZoomImage;
