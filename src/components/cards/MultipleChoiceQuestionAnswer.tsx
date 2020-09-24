import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MARGIN, BORDER_WIDTH, BORDER_RADIUS, ICON, PADDING } from '../../styles/metrics';
import { GREEN, GREY, ORANGE, PINK, WHITE } from '../../styles/colors';
import Shadow from '../style/Shadow';
import { FIRA_SANS_MEDIUM } from '../../styles/fonts';
import { qcmAnswerType, AnswerState } from '../../screens/courses/cardTemplates/MultipleChoiceQuestionCard';

interface MultipleChoiceQuestionAnswerProps {
  answer: qcmAnswerType,
  index: number,
  onPress: (index: number) => void,
  answerState: string,
}

interface colorsType {
  shadowBgColor: string,
  answerBorderColor: string,
  textColor: string,
  markerColor?: string,
}

const MultipleChoiceQuestionAnswer = ({
  answer,
  index,
  onPress,
  answerState,
}: MultipleChoiceQuestionAnswerProps) => {
  const [colors, setColors] = useState<colorsType>({
    shadowBgColor: GREY[200],
    answerBorderColor: GREY[200],
    textColor: GREY[800],
    markerColor: GREEN[600],
  });

  useEffect(() => {
    if (answerState === AnswerState.Selected) {
      return setColors(prevColors => ({
        ...prevColors,
        shadowBgColor: PINK[500],
        answerBorderColor: PINK[500],
        textColor: GREY[800],
      }));
    }

    if (answerState === AnswerState.GoodAndSelected) {
      return setColors(prevColors => ({
        ...prevColors,
        shadowBgColor: GREEN[600],
        answerBorderColor: GREEN[600],
        textColor: GREEN[600],
      }));
    }

    if (answerState === AnswerState.FalseAndSelected) {
      return setColors(prevColors => ({
        ...prevColors,
        shadowBgColor: ORANGE[600],
        answerBorderColor: ORANGE[600],
        textColor: ORANGE[600],
        markerColor: ORANGE[600],
      }));
    }

    return setColors(prevColors => ({
      ...prevColors,
      shadowBgColor: GREY[200],
      answerBorderColor: GREY[200],
      textColor: GREY[800],
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerState]);

  const isMarkerVisible = answerState === AnswerState.GoodAndSelected ||
    answerState === AnswerState.GoodAndNotSelected ||
    answerState === AnswerState.FalseAndSelected;

  const style = styles(colors);

  return (
    <View style={style.answerContainer}>
      <TouchableOpacity style={style.answer} onPress={() => onPress(index)}>
        <View style={style.textContainer}>
          <Text style={style.text}>{answer.label}</Text>
        </View>
        {isMarkerVisible &&
          <View style={style.markerContainer}>
            <Feather style={style.marker} name={answer.correct ? 'check-circle' : 'x-circle'}/>
          </View>
        }
      </TouchableOpacity>
      <Shadow backgroundColor={colors.shadowBgColor} borderRadius={BORDER_RADIUS.MD}/>
    </View>
  );
};

const styles = (colors: colorsType) => StyleSheet.create({
  answerContainer: {
    marginBottom: MARGIN.SM,
  },
  answer: {
    flexDirection: 'row',
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: colors.answerBorderColor,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: 'center',
  },
  markerContainer: {
    marginHorizontal: MARGIN.SM,
    position: 'absolute',
    right: 0,
  },
  marker: {
    color: colors.markerColor,
    fontSize: ICON.MD,
    alignSelf: 'center',
    paddingVertical: PADDING.SM,
    backgroundColor: WHITE,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {
    ...FIRA_SANS_MEDIUM.MD,
    color: colors.textColor,
    marginVertical: MARGIN.LG / 2,
    marginHorizontal: MARGIN.MD,
  },
});

export default MultipleChoiceQuestionAnswer;
