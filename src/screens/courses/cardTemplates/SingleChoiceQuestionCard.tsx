import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { StateType } from '../../../../src/types/StoreType';
import { getCard } from '../../../store/selectors';
import { navigate } from '../../../navigationRef';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';
import { GREY } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import AnswerProposal from '../../../components/cards/AnswerProposal';

interface SingleChoiceQuestionCard {
  card: CardType,
  courseId: string,
  index: number
}

const SingleChoiceQuestionCard = ({ card, courseId, index }: SingleChoiceQuestionCard) => {
  const [isPressed, setIsPressed] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (card && card.falsyAnswers && !isPressed) setData(shuffle([...card.falsyAnswers, card.qcuGoodAnswer]));
  }, [card, isPressed]);

  const goBack = () => {
    navigate('Home', { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } });
  };

  if (!card || !card.falsyAnswers) return null;

  return (
    <>
      <CardHeader color={GREY[600]} onPress={() => goBack()} icon='x-circle' />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.question}>{card.question}</Text>
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item}
            renderItem={({ item }) =>
              <AnswerProposal
                onPress={() => setIsPressed(true)} isPressed={isPressed}
                item={item} goodAnswer={card.qcuGoodAnswer} /> } />
        </View>
      </ScrollView>
      <QuestionCardFooter index={index} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.LG,
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: MARGIN.LG,
  },
  question: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY['800'],
    marginBottom: MARGIN.XL,
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.cardIndex });

export default connect(mapStateToProps)(SingleChoiceQuestionCard);
