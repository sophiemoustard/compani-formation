import React, { useRef } from 'react';
import { View, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { PINK } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import FeatherButton from '../icons/FeatherButton';
import cardsStyle from '../../styles/cards';
import styles from './styles';

interface ZoomImageProps {
  image: { uri: string },
  setZoomImage: (value) => void,
}

const ZoomImage = ({
  image,
  setZoomImage,
}: ZoomImageProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handlePinch = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: true });
  const handlePan = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE && event.nativeEvent.scale < 1) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const onPanStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateX, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateY, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => setZoomImage(false)} activeOpacity={1}>
        <FeatherButton name={'x-circle'} onPress={() => setZoomImage(false)} size={ICON.LG} color={PINK[500]}
          style={styles.goBack} />
        <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={onPanStateChange}>
          <Animated.View style={styles.content}>
            {!!image &&
                <TouchableWithoutFeedback>
                  <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={onPinchStateChange}>
                    <Animated.Image source={image} style={[
                      cardsStyle.media,
                      styles.media,
                      { transform: [{ scale }, { translateX }, { translateY }] },
                    ]} />
                  </PinchGestureHandler>
                </TouchableWithoutFeedback>
            }
          </Animated.View>
        </PanGestureHandler>
      </TouchableOpacity>
    </View>);
};

export default ZoomImage;
