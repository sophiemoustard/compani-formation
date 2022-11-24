import { useState, useEffect, Dispatch } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { useNavigation } from '@react-navigation/native';
import { footerColorsType, MultipleChoiceQuestionType, QcmAnswerFromAPIType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/cards/selectors';
import Actions from '../../../../store/cards/actions';
import CardHeader from '../../../../components/cards/CardHeader';
import { GREEN, GREY, ORANGE, PINK } from '../../../../styles/colors';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import QuizProposition from '../../../../components/cards/QuizProposition';
import cardsStyle from '../../../../styles/cards';
import FooterGradient from '../../../../components/design/FooterGradient';
import styles from './styles';
import { quizJingle } from '../../../../core/helpers/utils';
import { ActionType } from '../../../../context/types';

interface MultipleChoiceQuestionCardProps {
  card: MultipleChoiceQuestionType,
  cardIndex: number | null,
  incGoodAnswersCount: () => void,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

export interface QcmAnswerType extends QcmAnswerFromAPIType {
  isSelected: boolean,
}

const MultipleChoiceQuestionCard = ({
  card,
  cardIndex,
  incGoodAnswersCount,
  isLoading,
  setIsRightSwipeEnabled,
}: MultipleChoiceQuestionCardProps) => {
  const [answers, setAnswers] = useState<QcmAnswerType[]>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttons: PINK[500],
    text: GREY[100],
    background: GREY[100],
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && !isValidated) setAnswers(shuffle(card.qcAnswers.map(ans => ({ ...ans, isSelected: false }))));
    setIsRightSwipeEnabled(isValidated);
  }, [card, isLoading, isValidated, setIsRightSwipeEnabled]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttons: PINK[500], text: GREY[100], background: GREY[100] });
    }

    if (isAnsweredCorrectly) {
      return setFooterColors({ buttons: GREEN[600], text: GREEN[600], background: GREEN[100] });
    }

    return setFooterColors({ buttons: ORANGE[600], text: ORANGE[600], background: ORANGE[100] });
  }, [isValidated, answers, isAnsweredCorrectly]);

  if (isLoading) return null;

  const isOneAnswerSelected = () => answers.some(answer => answer.isSelected);

  const onSelectAnswer = (index: number) => {
    setAnswers((prevState: QcmAnswerType[]) => {
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

      quizJingle(areAnswersCorrect);
      setIsAnsweredCorrectly(areAnswersCorrect);
      if (areAnswersCorrect) incGoodAnswersCount();

      return setIsValidated(true);
    }

    return cardIndex !== null ? navigation.navigate(`card-${cardIndex + 1}`) : null;
  };

  const renderItem = (item: QcmAnswerType, index: number) => <QuizProposition onPress={onSelectAnswer} index={index}
    isValidated={isValidated} isGoodAnswer={item.correct} isSelected={item.isSelected} item={item.text} />;

  const style = styles(footerColors.background);

  return (
    <SafeAreaView style={style.safeArea} edges={['top']}>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          <Text style={cardsStyle.informativeText}>Plusieurs réponses sont possibles</Text>
          <FlatList data={answers} keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)} />
        </View>
      </ScrollView>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        <QuizCardFooter isValidated={isValidated} isValid={isAnsweredCorrectly} cardIndex={cardIndex}
          buttonDisabled={!isOneAnswerSelected()} footerColors={footerColors} explanation={card.explanation}
          onPressFooterButton={onPressFooterButton} />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({
  card: Selectors.getCard(state),
  cardIndex: state.cards.cardIndex,
});

const mapDispatchToProps = (dispatch: Dispatch<ActionType>) => ({
  incGoodAnswersCount: () => dispatch(Actions.incGoodAnswersCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceQuestionCard);
