import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import shuffle from 'lodash/shuffle';
import { useNavigation } from '@react-navigation/native';
import CardHeader from '../../../../components/cards/CardHeader';
import QuizCardFooter from '../../../../components/cards/QuizCardFooter';
import QuizProposition from '../../../../components/cards/QuizProposition';
import FooterGradient from '../../../../components/design/FooterGradient';
import { quizJingle } from '../../../../core/helpers/utils';
import {
  useAddQuizzAnswer,
  useGetCard,
  useGetCardIndex,
  useGetQuizzAnswer,
  useIncGoodAnswersCount,
} from '../../../../store/cards/hooks';
import { GREEN, GREY, ORANGE, PINK } from '../../../../styles/colors';
import cardsStyle from '../../../../styles/cards';
import { footerColorsType, MultipleChoiceQuestionType, QCAnswerType } from '../../../../types/CardType';
import styles from './styles';

interface MultipleChoiceQuestionCardProps {
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

const MultipleChoiceQuestionCard = ({ isLoading, setIsRightSwipeEnabled }: MultipleChoiceQuestionCardProps) => {
  const card: MultipleChoiceQuestionType = useGetCard();
  const cardIndex = useGetCardIndex();
  const incGoodAnswersCount = useIncGoodAnswersCount();
  const quizzAnswer = useGetQuizzAnswer();
  const addQuizzAnswer = useAddQuizzAnswer();
  const [answers, setAnswers] = useState<QCAnswerType[]>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttons: PINK[500],
    text: GREY[100],
    background: GREY[100],
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && !isValidated) {
      if (quizzAnswer?.answerList.length) {
        setAnswers(quizzAnswer.answerList as QCAnswerType[]);
        setIsValidated(true);
        const areAnswersCorrect = (quizzAnswer.answerList as QCAnswerType[])
          .every(answer => answer.isSelected === answer.correct);
        setIsAnsweredCorrectly(areAnswersCorrect);
      } else setAnswers(shuffle(card.qcAnswers.map(ans => ({ ...ans, isSelected: false }))));
    }
    setIsRightSwipeEnabled(isValidated);
  }, [card, isLoading, isValidated, quizzAnswer, setIsRightSwipeEnabled]);

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
    setAnswers((prevState: QCAnswerType[]) => {
      const newState = [...prevState];
      newState[index].isSelected = !newState[index].isSelected;

      return newState;
    });
  };

  const onPressFooterButton = () => {
    if (!isOneAnswerSelected()) return null;

    if (!isValidated) {
      const areAnswersCorrect = answers.every(answer => answer.isSelected === answer.correct);

      quizJingle(areAnswersCorrect);
      setIsAnsweredCorrectly(areAnswersCorrect);
      if (areAnswersCorrect) incGoodAnswersCount();
      addQuizzAnswer({ card: card._id, answerList: answers });

      return setIsValidated(true);
    }

    return cardIndex !== null ? navigation.navigate(`card-${cardIndex + 1}`) : null;
  };

  const renderItem = (item: QCAnswerType, index: number) => <QuizProposition onPress={onSelectAnswer} index={index}
    isValidated={isValidated} isGoodAnswer={item.correct} isSelected={item.isSelected} item={item.text} />;

  const style = styles(footerColors.background);

  return (
    <SafeAreaView style={style.safeArea} edges={['top']}>
      <CardHeader />
      <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.question}>{card.question}</Text>
        <View>
          <Text style={cardsStyle.informativeText}>Plusieurs réponses sont possibles</Text>
          {answers.map((item, index) => <View key={index}>{renderItem(item, index)}</View>)}
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

export default MultipleChoiceQuestionCard;
