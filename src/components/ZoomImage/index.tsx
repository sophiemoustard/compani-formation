import React, { useRef, useState } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
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

const ZoomImage = ({ image, setZoomImage }: ZoomImageProps) => {
  const [scale] = useState(new Animated.Value(1));
  const [translate] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const pan = useRef<PanGestureHandler>(null);
  const pinch = useRef<PinchGestureHandler>(null);

  const handlePinch = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: false });
  const handlePan = Animated.event(
    [{ nativeEvent: { translationX: translate.x, translationY: translate.y } }],
    { useNativeDriver: false }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldtate === State.ACTIVE) {
      Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
    }
  };

  const onPanStateChange = (event) => {
    translate.extractOffset();
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translate.x, { toValue: 1, useNativeDriver: false }).start();
      Animated.spring(translate.y, { toValue: 1, useNativeDriver: false }).start();
    }
  };

  const transform = [{ scale }, { translateX: translate.x }, { translateY: translate.y }];

  return (
    <View style={styles.container} >
      <TouchableOpacity onPress={() => setZoomImage(false)} activeOpacity={1}>
        <FeatherButton name={'x-circle'} onPress={() => setZoomImage(false)} size={ICON.LG} color={PINK[500]}
          style={styles.goBack} />
        <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={onPanStateChange} ref={pan}
          simultaneousHandlers={pinch} maxPointers={1}>
          <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={onPinchStateChange} ref={pinch}
            simultaneousHandlers={pan}>
            {!!image && <Animated.Image source={image} style={[cardsStyle.media, styles.media, { transform }]} />}
          </PinchGestureHandler>
        </PanGestureHandler>
      </TouchableOpacity>
    </View>);
};

export default ZoomImage;
