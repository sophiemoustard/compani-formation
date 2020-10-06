import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { MultipleChoiceQuestionType, qcmAnswerFromAPIType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { IncGoodAnswersCountType } from '../../../types/store/ActivityStoreType';
import { getCard } from '../../../store/activities/selectors';
import Actions from '../../../store/activities/actions';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREEN, GREY, ORANGE, PINK } from '../../../styles/colors';
import { ABSOLUTE_BOTTOM_POSITION, INPUT_HEIGHT, MARGIN, PADDING } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { MULTIPLE_CHOICE_QUESTION } from '../../../core/data/constants';
import { navigate } from '../../../navigationRef';
import QuizProposition from '../../../components/cards/QuizProposition';
import cardsStyle from '../../../styles/cards';
import FooterGradient from '../../../components/style/FooterGradient';

interface MultipleChoiceQuestionCardProps {
  card: MultipleChoiceQuestionType,
  cardIndex: number,
  incGoodAnswersCount: () => void,
}

export interface qcmAnswerType extends qcmAnswerFromAPIType {
  isSelected: boolean,
}

interface footerColorsType {
  buttonsColor: string,
  textColor: string,
  backgroundColor: string,
}

const MultipleChoiceQuestionCard = ({ card, cardIndex, incGoodAnswersCount }: MultipleChoiceQuestionCardProps) => {
  const [answers, setAnswers] = useState<Array<qcmAnswerType>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttonsColor: PINK[500],
    textColor: GREY[100],
    backgroundColor: GREY[100],
  });

  useEffect(() => {
    if (card && card.template === MULTIPLE_CHOICE_QUESTION && !isValidated) {
      setAnswers(shuffle(card.qcmAnswers.map(ans => ({ ...ans, isSelected: false }))));
    }
  }, [card, isValidated]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttonsColor: PINK[500], textColor: GREY[100], backgroundColor: GREY[100] });
    }

    if (isAnsweredCorrectly) {
      return setFooterColors({ buttonsColor: GREEN[600], textColor: GREEN[600], backgroundColor: GREEN[100] });
    }

    return setFooterColors({ buttonsColor: ORANGE[600], textColor: ORANGE[600], backgroundColor: ORANGE[100] });
  }, [isValidated, answers, isAnsweredCorrectly]);

  const isOneAnswerSelected = () => answers.some(answer => answer.isSelected);

  const onSelectAnswer = (index: number) => {
    setAnswers((prevState: qcmAnswerType[]) => {
      const newState = [...prevState];
      newState[index].isSelected = !newState[index].isSelected;

      return newState;
    });
  };

  const onPressFooterButton = () => {
    if (!isOneAnswerSelected()) return null;

    if (!isValidated) {
      const areAnswersCorrect = answers.every(answer =>
        (answer.isSelected && answer.correct) || (!answer.isSelected && !answer.correct));
      setIsAnsweredCorrectly(areAnswersCorrect);
      if (areAnswersCorrect) incGoodAnswersCount();
      return setIsValidated(true);
    }

    return navigate(`card-${cardIndex + 1}`);
  };

  const style = styles(footerColors.textColor, footerColors.backgroundColor);

  if (!card || card.template !== MULTIPLE_CHOICE_QUESTION) return null;

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container}>
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          <Text style={style.informativeText}>Plusieurs réponses sont possibles</Text>
          <FlatList
            data={answers}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <QuizProposition onPress={onSelectAnswer} index={index} item={item.label} isValidated={isValidated}
                isGoodAnswer={item.correct} isSelected={item.isSelected} />
            )}
          />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        {isValidated && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} index={cardIndex} buttonDisabled={!isOneAnswerSelected()}
          buttonColor={isOneAnswerSelected() ? footerColors.buttonsColor : GREY[300]} />
      </View>
    </>
  );
};

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: PADDING.XL,
  },
  informativeText: {
    ...FIRA_SANS_REGULAR.SM,
    color: PINK[500],
    marginBottom: MARGIN.SM,
  },
  explanation: {
    color: textColor,
    minHeight: INPUT_HEIGHT,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: ABSOLUTE_BOTTOM_POSITION,
    backgroundColor,
  },
  footerContainer: {
    backgroundColor,
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), cardIndex: state.activities.cardIndex });
const mapDispatchToProps = (dispatch: ({ type }: IncGoodAnswersCountType) => void) => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceQuestionCard);
