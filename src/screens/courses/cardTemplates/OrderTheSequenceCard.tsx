import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { orderTheSequenceFromAPIType, OrderTheSequenceType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREEN, GREY, ORANGE, PINK } from '../../../styles/colors';
import {
  ABSOLUTE_BOTTOM_POSITION,
  INPUT_HEIGHT,
  MARGIN,
  PADDING,
} from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { ORDER_THE_SEQUENCE } from '../../../core/data/constants';
import { navigate } from '../../../navigationRef';
import cardsStyle from '../../../styles/cards';
import FooterGradient from '../../../components/style/FooterGradient';
import OrderProposition from '../../../components/cards/OrderProposition';

interface OrderTheSequenceCardProps {
  card: OrderTheSequenceType,
  cardIndex: number,
}

export interface answerPositionType extends orderTheSequenceFromAPIType {
  tempPosition: number,
}

interface footerColorsType {
  buttonsColor: string,
  textColor: string,
  backgroundColor: string,
}

const OrderTheSequenceCard = ({ card, cardIndex }: OrderTheSequenceCardProps) => {
  const [answers, setAnswers] = useState<Array<answerPositionType>>([]);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [footerColors, setFooterColors] = useState<footerColorsType>({
    buttonsColor: PINK[500],
    textColor: GREY[100],
    backgroundColor: GREY[100],
  });

  useEffect(() => {
    if (card && card.template === ORDER_THE_SEQUENCE && !isValidated) {
      const shuffledCards = shuffle(card.orderedAnswers.map((ans, index) => ({ label: ans, position: index })));
      setAnswers(shuffledCards.map((ans, index) => ({ ...ans, tempPosition: index })));
    }
  }, [card, isValidated]);

  useEffect(() => {
    if (!isValidated) {
      return setFooterColors({ buttonsColor: PINK[500], textColor: GREY[100], backgroundColor: GREY[100] });
    }

    const isAnsweredCorrectly = answers.every(answer => (answer.position === answer.tempPosition));
    if (isAnsweredCorrectly) {
      return setFooterColors({ buttonsColor: GREEN[600], textColor: GREEN[600], backgroundColor: GREEN[100] });
    }

    return setFooterColors({ buttonsColor: ORANGE[600], textColor: ORANGE[600], backgroundColor: ORANGE[100] });
  }, [isValidated, answers]);

  const onPressFooterButton = () => {
    if (!isValidated) return setIsValidated(true);
    return navigate(`card-${cardIndex + 1}`);
  };

  const style = styles(footerColors.textColor, footerColors.backgroundColor);

  if (!card || card.template !== ORDER_THE_SEQUENCE) return null;

  const setArray = (data) => {
    setAnswers(data.map((ans, index) => ({ label: ans.label, position: ans.position, tempPosition: index })));
  };

  return (
    <>
      <CardHeader />
      <View style={style.container}>
        <DraggableFlatList
          ListHeaderComponent={<Text style={[cardsStyle.question, style.question]}>{card.question}</Text>}
          showsVerticalScrollIndicator={false}
          data={answers}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, drag }) => (
            <OrderProposition item={item} isValidated={isValidated}
              isGoodPosition={item.position === item.tempPosition} drag={drag} />
          )}
          onDragEnd={({ data }) => setArray(data)} />
      </View>
      <View style={style.footerContainer}>
        {!isValidated && <FooterGradient /> }
        {isValidated && <Text style={[cardsStyle.explanation, style.explanation]}>{card.explanation}</Text>}
        <QuestionCardFooter onPressButton={onPressFooterButton} buttonCaption={isValidated ? 'Continuer' : 'Valider'}
          arrowColor={footerColors.buttonsColor} index={cardIndex} buttonDisabled={false}
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

const mapStateToProps = (state: StateType) => ({ card: getCard(state), cardIndex: state.activities.cardIndex });

export default connect(mapStateToProps)(OrderTheSequenceCard);
