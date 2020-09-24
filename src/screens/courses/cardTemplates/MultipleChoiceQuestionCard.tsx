import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { MultipleChoiceQuestionType, qcmAnswerFromAPIType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_MEDIUM, FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREEN, GREY, ORANGE, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { MULTIPLE_CHOICE_QUESTION } from '../../../core/data/constants';
import { navigate } from '../../../navigationRef';
import SingleChoiceQuestionAnswer from '../../../components/cards/SingleChoiceQuestionAnswer';

interface MultipleChoiceQuestionCard {
  card: MultipleChoiceQuestionType,
  cardIndex: number,
}

export interface qcmAnswerType extends qcmAnswerFromAPIType {
  isSelected: boolean,
}

interface footerColorsType {
  buttonsColor: string,
  textColor: string,
}

const MultipleChoiceQuestionCard = ({ card, cardIndex }: MultipleChoiceQuestionCard) => {
  const [answers, setAnswers] = useState<qcmAnswerType[]>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({ buttonsColor: PINK[500], textColor: GREY[100] });

  useEffect(() => {
    if (card && card.template === MULTIPLE_CHOICE_QUESTION && !isValidated) {
      setAnswers(shuffle(card.qcmAnswers.map(ans => ({ ...ans, isSelected: false }))));
    }
  }, [card, isValidated]);

  useEffect(() => {
    if (!isValidated) return setFooterColors({ buttonsColor: PINK[500], textColor: GREY[100] });

    const isAnsweredCorrectly = answers
      .some(answer => (answer.isSelected && !answer.correct) || (!answer.isSelected && answer.correct));
    if (!isAnsweredCorrectly) return setFooterColors({ buttonsColor: GREEN[600], textColor: GREEN[600] });

    return setFooterColors({ buttonsColor: ORANGE[600], textColor: ORANGE[600] });
  }, [isValidated, answers]);

  const onSelectAnswer = (index: number) => {
    setAnswers((prevState: qcmAnswerType[]) => {
      const newState = [...prevState];
      newState[index].isSelected = !newState[index].isSelected;

      return newState;
    });
  };

  const onPressFooterButton = () => {
    const isOneAnswerSelected = answers.some(answer => answer.isSelected);
    if (!isOneAnswerSelected) return null;

    if (!isValidated) { setIsValidated(true); return null; }

    return navigate(`card-${cardIndex + 1}`);
  };

  const style = styles(footerColors.textColor);

  if (!card || card.template !== MULTIPLE_CHOICE_QUESTION) return null;

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.question}>{card.question}</Text>
        <View>
          <Text style={style.informativeText}>Plusieurs réponses sont possibles</Text>
          <FlatList
            data={answers}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <SingleChoiceQuestionAnswer onPress={onSelectAnswer} index={index}
                isGoodAnswer={item.correct} isSelected={item.isSelected}
                item={item.label} isPressed={isValidated} />
            )}
          />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {isValidated && <Text style={style.explanation}>{card.explanation}</Text>}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} buttonColor={footerColors.buttonsColor} index={cardIndex} />
      </View>
    </>
  );
};

const styles = (textColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: MARGIN.LG,
  },
  informativeText: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[500],
    marginBottom: MARGIN.SM,
  },
  question: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY['800'],
    marginBottom: MARGIN.XL,
  },
  explanation: {
    ...FIRA_SANS_REGULAR.MD,
    marginHorizontal: MARGIN.LG,
    marginTop: MARGIN.MD,
    marginBottom: -MARGIN.SM,
    color: textColor,
  },
  footerContainer: {
    // eslint-disable-next-line no-nested-ternary
    backgroundColor: textColor === GREEN[600] ? GREEN[100] : textColor === ORANGE[600] ? ORANGE[100] : GREY[100],
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), cardIndex: state.activities.cardIndex });

export default connect(mapStateToProps)(MultipleChoiceQuestionCard);
