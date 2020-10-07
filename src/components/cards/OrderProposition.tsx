import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS, BUTTON_HEIGHT, ORDERED_ANSWER_MIN_HEIGHT } from '../../styles/metrics';
import { WHITE, GREY, GREEN, ORANGE } from '../../styles/colors';
import Shadow from '../style/Shadow';
import { FIRA_SANS_MEDIUM, NUNITO_BLACK } from '../../styles/fonts';

interface OrderPropositionProps {
  item: {
    label: string,
    goodPosition: number,
    tempPosition: number
  },
  isValidated: boolean,
  drag: () => void,
}

const OrderProposition = ({ item, isValidated = false, drag }: OrderPropositionProps) => {
  const [color, setColor] = useState<string>(GREY[200]);
  const isGoodPosition = item.goodPosition === item.tempPosition;

  useEffect(() => {
    if (isGoodPosition && isValidated) return setColor(GREEN[600]);
    if (!isGoodPosition && isValidated) return setColor(ORANGE[600]);
    return setColor(GREY[500]);
  }, [isGoodPosition, isValidated]);

  const style = styles(color, isValidated);

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.contentContainer} disabled={isValidated} onLongPress={drag} >
        <View style= {style.indexContainer}>
          <View style={style.index}>
            <Text style={style.indexText}>{item.tempPosition + 1}</Text>
          </View>
          <Shadow customStyle={style.indexShadow} />
        </View>
        <View style={style.answerContainer}>
          <View style={style.answer}>
            <Text style={style.answerText}>{item.label}</Text>
          </View>
          <Shadow customStyle={style.answerShadow} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = (color: string, isValidated: boolean) => StyleSheet.create({
  container: {
    marginBottom: MARGIN.MD,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  indexContainer: {
    height: BUTTON_HEIGHT,
  },
  answerContainer: {
    flex: 1,
  },
  index: {
    height: '100%',
    borderWidth: BORDER_WIDTH,
    borderRightWidth: 0,
    backgroundColor: isValidated ? color : GREY[100],
    borderColor: isValidated ? color : GREY[200],
    borderTopLeftRadius: BORDER_RADIUS.MD,
    borderBottomLeftRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answer: {
    minHeight: ORDERED_ANSWER_MIN_HEIGHT,
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: isValidated ? color : GREY[200],
    borderBottomLeftRadius: BORDER_RADIUS.MD,
    borderTopRightRadius: BORDER_RADIUS.MD,
    borderBottomRightRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerText: {
    ...FIRA_SANS_MEDIUM.MD,
    color: GREY[800],
    marginVertical: MARGIN.LG / 2,
    marginHorizontal: MARGIN.MD,
  },
  indexText: {
    ...NUNITO_BLACK.XL,
    color: isValidated ? WHITE : GREY[800],
    marginHorizontal: MARGIN.MD,
  },
  answerShadow: {
    backgroundColor: isValidated ? color : GREY[200],
    borderRadius: BORDER_RADIUS.LG,
  },
  indexShadow: {
    backgroundColor: isValidated ? color : GREY[200],
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: BORDER_RADIUS.LG,
    borderTopLeftRadius: BORDER_RADIUS.LG,
  },
});

export default OrderProposition;
