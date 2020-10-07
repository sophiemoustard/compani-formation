import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { OrderedAnswerType, OrderTheSequenceType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREEN, GREY, ORANGE, PINK } from '../../../styles/colors';
import { ABSOLUTE_BOTTOM_POSITION, INPUT_HEIGHT, MARGIN, PADDING } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { ORDER_THE_SEQUENCE } from '../../../core/data/constants';
import { navigate } from '../../../navigationRef';
import cardsStyle from '../../../styles/cards';
import FooterGradient from '../../../components/style/FooterGradient';
import OrderProposition from '../../../components/cards/OrderProposition';

interface OrderTheSequenceCardProps {
  card: OrderTheSequenceType,
  index: number,
}

export interface answerPositionType extends OrderedAnswerType {
  goodPosition: number,
  tempPosition: number,
}

interface footerColorsType {
  buttonsColor: string,
  textColor: string,
  backgroundColor: string,
}

const OrderTheSequenceCard = ({ card, index }: OrderTheSequenceCardProps) => {
  const [answers, setAnswers] = useState<Array<answerPositionType>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttonsColor: PINK[500],
    textColor: GREY[100],
    backgroundColor: GREY[100],
  });

  useEffect(() => {
    if (card && card.template === ORDER_THE_SEQUENCE && !isValidated) {
      const shuffledCards = shuffle(card.orderedAnswers
        .map((ans, answerIndex) => ({ label: ans, goodPosition: answerIndex })));
      setAnswers(shuffledCards.map((ans, answerIndex) => ({ ...ans, tempPosition: answerIndex })));
    }
  }, [card, isValidated]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttonsColor: PINK[500], textColor: GREY[100], backgroundColor: GREY[100] });
    }

    const isAnsweredCorrectly = answers.every(answer => (answer.goodPosition === answer.tempPosition));
    if (isAnsweredCorrectly) {
      return setFooterColors({ buttonsColor: GREEN[600], textColor: GREEN[600], backgroundColor: GREEN[100] });
    }

    return setFooterColors({ buttonsColor: ORANGE[600], textColor: ORANGE[600], backgroundColor: ORANGE[100] });
  }, [isValidated, answers]);

  const onPressFooterButton = () => {
    if (!isValidated) return setIsValidated(true);
    return navigate(`card-${index + 1}`);
  };

  const setAnswersArray = ({ data }) => {
    setAnswers(data.map((ans, answerIndex) => ({
      label: ans.label, goodPosition: ans.goodPosition, tempPosition: answerIndex,
    })));
  };

  const renderItem = ({ item, drag }) => <OrderProposition item={item} isValidated={isValidated} drag={drag} />;

  if (!card || card.template !== ORDER_THE_SEQUENCE) return null;

  const style = styles(footerColors.textColor, footerColors.backgroundColor);

  return (
    <>
      <CardHeader />
      <View style={style.container}>
        <DraggableFlatList
          contentContainerStyle={style.draggableContainer}
          ListHeaderComponentStyle={style.questionContainer}
          ListHeaderComponent={<Text style={[cardsStyle.question, style.question]}>{card.question}</Text>}
          showsVerticalScrollIndicator={false} data={answers} keyExtractor={(_, answerIndex) => answerIndex.toString()}
          renderItem={renderItem} onDragEnd={setAnswersArray} />
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        {isValidated && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} index={index} buttonDisabled={false}
          buttonColor={footerColors.buttonsColor} />
      </View>
    </>
  );
};

const styles = (textColor: string, backgroundColor: string) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    paddingBottom: PADDING.XL,
  },
  draggableContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  questionContainer: {
    flexGrow: 1,
  },
  question: {
    ...FIRA_SANS_REGULAR.MD,
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

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(OrderTheSequenceCard);
