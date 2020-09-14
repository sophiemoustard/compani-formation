import React from 'react';
import { ScrollView, View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { StateType } from '../../../../src/types/StoreType';
import { getCard } from '../../../store/selectors';
import { navigate } from '../../../navigationRef';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_MEDIUM } from '../../../styles/fonts';
import { GREY, WHITE } from '../../../styles/colors';
import { MARGIN, BORDER_RADIUS, BORDER_WIDTH } from '../../../styles/metrics';
import Shadow from '../../../components/style/Shadow';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';

interface SingleChoiceQuestionCard {
  card: CardType,
  courseId: string,
  index: number
}

const answerProposal = item => (
  <View style={styles.answerContainer}>
    <TouchableOpacity style={styles.answer}>
      <Text style={styles.text}>
        {item}
      </Text>
    </TouchableOpacity>
    <Shadow backgroundColor={GREY['200']} borderRadius={BORDER_RADIUS.LG}/>
  </View>
);

const SingleChoiceQuestionCard = ({ card, courseId, index }: SingleChoiceQuestionCard) => {
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
            data={shuffle([...card.falsyAnswers, card.qcuGoodAnswer])}
            keyExtractor={item => item}
            renderItem={({ item }) => answerProposal(item)} />
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
  answerContainer: {
    marginVertical: MARGIN.XS,
  },
  answer: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: BORDER_WIDTH,
    backgroundColor: WHITE,
    borderColor: GREY['200'],
    borderRadius: BORDER_RADIUS.MD,
  },
  text: {
    ...FIRA_SANS_MEDIUM.LG,
    color: GREY['800'],
    textAlign: 'center',
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.cardIndex });

export default connect(mapStateToProps)(SingleChoiceQuestionCard);
