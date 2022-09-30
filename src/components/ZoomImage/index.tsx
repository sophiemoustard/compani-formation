import { useRef } from 'react';
import { Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { WHITE } from '../../styles/colors';
import { ICON } from '../../styles/metrics';
import FeatherButton from '../icons/FeatherButton';
import cardsStyle from '../../styles/cards';
import styles from './styles';

interface ZoomImageProps {
  image: { uri: string },
  setZoomImage: (value) => void,
}

const ZoomImage = ({ image, setZoomImage }: ZoomImageProps) => {
  const lastScale = useRef<number>(1);
  const baseScale = new Animated.Value(1);
  const pinchScale = new Animated.Value(1);
  const scale = Animated.multiply(baseScale, pinchScale);
  const translate = new Animated.ValueXY({ x: 0, y: 0 });
  const pan = useRef<PanGestureHandler>(null);
  const pinch = useRef<PinchGestureHandler>(null);

  const handlePinch = Animated.event([{ nativeEvent: { scale: pinchScale } }], { useNativeDriver: false });
  const handlePan = Animated.event(
    [{ nativeEvent: { translationX: translate.x, translationY: translate.y } }],
    { useNativeDriver: false }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale;
      baseScale.setValue(lastScale.current);
      pinchScale.setValue(1);
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <FeatherButton name='x-circle' onPress={() => setZoomImage(false)} size={ICON.LG} color={WHITE}
        style={styles.goBack} />
      <PanGestureHandler onGestureEvent={handlePan} onHandlerStateChange={onPanStateChange} ref={pan}
        simultaneousHandlers={pinch} maxPointers={1}>
        <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={onPinchStateChange} ref={pinch}
          simultaneousHandlers={pan}>
          {!!image &&
            <Animated.Image source={image} style={[cardsStyle.media, styles.media, { transform }]} />}
        </PinchGestureHandler>
      </PanGestureHandler>
    </SafeAreaView>);
};

export default ZoomImage;
