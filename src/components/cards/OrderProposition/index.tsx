import React, { useState, useEffect, useImperativeHandle } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { GREY, GREEN, ORANGE } from '../../../styles/colors';
import Shadow from '../../design/Shadow';
import styles from './styles';

interface OrderPropositionProps {
  item: {
    label: string,
    goodPosition: number,
    tempPosition: number
  },
  items: any,
  index: number,
  isValidated: boolean,
  viewHeight: number[],
  setAnswersTempPositions: (index: number, positionCount: number) => void,
  onMove: (index: number, tmpToMove: number, orientation: number) => void,
  setViewHeight: (height: number, index: number) => void,
}

const OrderProposition = React.forwardRef((
  {
    item,
    items,
    index,
    isValidated = false,
    viewHeight,
    setAnswersTempPositions,
    onMove,
    setViewHeight,
  }: OrderPropositionProps,
  ref
) => {
  const translate = useSharedValue({ x: 0, y: 0 });
  const lastOffsetY = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const upJumpdone = useSharedValue(0);
  const downJumpdone = useSharedValue(0);
  const positionCount = useSharedValue(0);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height, index);
  };
  const [color, setColor] = useState<string>(GREY[200]);
  const [dragButtonColor, setDragButtonColor] = useState<string>(GREY[500]);
  const [isGoodPosition, setIsGoodPosition] = useState<boolean>(item.goodPosition === item.tempPosition);

  useEffect(() => {
    if (isGoodPosition && isValidated) {
      setDragButtonColor(GREEN[800]);
      return setColor(GREEN[600]);
    }
    if (!isGoodPosition && isValidated) {
      setDragButtonColor(ORANGE[800]);
      return setColor(ORANGE[600]);
    }

    setDragButtonColor(GREY[500]);
    return setColor(GREY[500]);
  }, [isGoodPosition, isValidated]);

  useEffect(() => {
    setIsGoodPosition(item.goodPosition === item.tempPosition);
  }, [item]);

  useImperativeHandle(ref, () => ({
    moveTo(triggeringPropsRange: number) {
      const sumOtherHeight = viewHeight.filter((_, i) => i !== index).reduce((a, b) => a + b, 0);
      const translateY = lastOffsetY.value + triggeringPropsRange;
      const range = triggeringPropsRange > 0
        ? [
          [triggeringPropsRange, sumOtherHeight, sumOtherHeight, sumOtherHeight],
          [[0, viewHeight[2] - viewHeight[0]], viewHeight[2], viewHeight[2], [0, viewHeight[2] - viewHeight[0]]],
          [0, 0, 0, [-viewHeight[0], -viewHeight[1]]],
        ]
        : [
          [0, 0, 0, [viewHeight[1], viewHeight[2]]],
          [-viewHeight[0], -viewHeight[0], -viewHeight[0], [0, viewHeight[2] - viewHeight[0]]],
          [triggeringPropsRange, -sumOtherHeight, -sumOtherHeight, -sumOtherHeight],
        ];
      const allowedPositions = [
        [0, viewHeight[1], viewHeight[2], sumOtherHeight],
        [-viewHeight[0], viewHeight[2] - viewHeight[0], 0, viewHeight[2]],
        [0, -viewHeight[1], -viewHeight[0], -sumOtherHeight],
      ];
      const rank = allowedPositions[index].findIndex(b => b === lastOffsetY.value);
      if (typeof range[index][rank] === 'number' && range[index][rank] !== translateY) return;
      if (Array.isArray(range[index][rank]) && !range[index][rank].includes(translateY)) return;
      translate.value = { x: 0, y: translateY };
      lastOffsetY.value = translateY;
    },
  }));

  const gesture = Gesture
    .Pan()
    .manualActivation(true)
    .onTouchesMove((_e, state) => {
      if (!isValidated) {
        state.activate();
      } else {
        state.fail();
      }
    })
    .onBegin(() => {
      zIndex.value = 100;
    })
    .onUpdate((event) => {
      const sumOtherHeight = viewHeight.filter((_, i) => i !== index).reduce((a, b) => a + b, 0);
      if (event.translationY < 0) {
        const maxY = [0, -viewHeight[0], -sumOtherHeight];
        translate.value = {
          x: 0,
          y: Math.max(lastOffsetY.value + event.translationY, maxY[index]),
        };
        if (lastOffsetY.value + event.translationY >= maxY[index]) {
          const value = [0, sumOtherHeight / 2, sumOtherHeight].reduce((prev, curr) =>
            (Math.abs(curr + event.translationY) < Math.abs(prev + event.translationY) ? curr : prev));
          const jump = value / (sumOtherHeight / 2);
          if (jump === 0) {
            positionCount.value = 0;
            if (upJumpdone.value === 1) {
              runOnJS(onMove)(index, item.tempPosition - 1, -1);
              upJumpdone.value = 0;
            }
          }
          if (jump === 1) {
            positionCount.value = -1;
            if (upJumpdone.value === 2) {
              runOnJS(onMove)(index, 0, -1);
              upJumpdone.value = 1;
            } else if (upJumpdone.value !== 1) {
              runOnJS(onMove)(index, item.tempPosition - 1, 1);
              upJumpdone.value = 1;
            }
          }
          if (jump === 2 && upJumpdone.value !== 2) {
            positionCount.value = -2;
            runOnJS(onMove)(index, item.tempPosition - 2, 1);
            upJumpdone.value = 2;
          }
        }
      } else if (event.translationY > 0) {
        const maxY = [sumOtherHeight, viewHeight[2], 0];
        translate.value = {
          x: 0,
          y: Math.min(lastOffsetY.value + event.translationY, maxY[index]),
        };
        if (lastOffsetY.value + event.translationY <= maxY[index]) {
          const value = [0, sumOtherHeight / 2, sumOtherHeight].reduce((prev, curr) =>
            (Math.abs(curr - event.translationY) < Math.abs(prev - event.translationY) ? curr : prev));
          const jump = value / (sumOtherHeight / 2);
          if (jump === 0) {
            positionCount.value = 0;
            if (downJumpdone.value === 1) {
              runOnJS(onMove)(index, item.tempPosition + 1, 1);
              downJumpdone.value = 0;
            }
          }
          if (jump === 1) {
            positionCount.value = 1;
            if (downJumpdone.value === 2) {
              runOnJS(onMove)(index, 2, 1);
              downJumpdone.value = 1;
            } else if (downJumpdone.value !== 1) {
              runOnJS(onMove)(index, item.tempPosition + 1, -1);
              downJumpdone.value = 1;
            }
          }
          if (jump === 2 && downJumpdone.value !== 2) {
            positionCount.value = 2;
            runOnJS(onMove)(index, item.tempPosition + 2, -1);
            downJumpdone.value = 2;
          }
        }
      }
    })
    .onEnd(() => {
      const sumOtherHeight = viewHeight.filter((_, i) => i !== index).reduce((a, b) => a + b, 0);
      if (Math.abs(positionCount.value)) {
        if (positionCount.value < 0) {
          const abovePropIndex = items.findIndex(i => i.tempPosition === item.tempPosition - 1);

          const value = Math.abs(positionCount.value) === 1 ? -viewHeight[abovePropIndex] : -sumOtherHeight;
          translate.value = { x: 0, y: lastOffsetY.value + value };
          lastOffsetY.value += value;
          runOnJS(setAnswersTempPositions)(index, positionCount.value);
        }
        if (positionCount.value > 0) {
          const bottom = items.findIndex(i => i.tempPosition === item.tempPosition + 1);

          const value = positionCount.value === 1 ? viewHeight[bottom] : sumOtherHeight;
          translate.value = { x: 0, y: lastOffsetY.value + value };
          lastOffsetY.value += value;
          runOnJS(setAnswersTempPositions)(index, positionCount.value);
        }
      } else {
        translate.value = { x: 0, y: lastOffsetY.value };
      }
      zIndex.value = 0;
      upJumpdone.value = 0;
      downJumpdone.value = 0;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value.x }, { translateY: translate.value.y }],
    zIndex: zIndex.value,
  }));

  const style = styles(color, isValidated);

  return (
    <GestureDetector gesture={gesture} touchAction={'pan-y'}>
      <Animated.View style={[animatedStyle]} onLayout={handleLayout}>
        <View style={style.container}>
          <View style={style.contentContainer}>
            <TouchableOpacity style={style.indexContainer} disabled={isValidated} delayLongPress={0}
              activeOpacity={1}>
              <View style={style.index}>
                <MaterialCommunityIcons name="drag" size={30} color={dragButtonColor} />
                <Text style={style.indexText}>{item.tempPosition + 1}</Text>
              </View>
              <Shadow customStyle={style.indexShadow} />
            </TouchableOpacity>
            <TouchableOpacity style={style.answerContainer} disabled={isValidated} delayLongPress={100}>
              <View style={style.answer}>
                <Text style={style.answerText}>{item.label}</Text>
              </View>
              <Shadow customStyle={style.answerShadow} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

export default OrderProposition;
