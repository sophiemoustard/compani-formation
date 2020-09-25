import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { OpenQuestionType } from '../../../types/CardType';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { OPEN_QUESTION } from '../../../core/data/constants';
import AnswerField from './AnswerField';

interface OpenQuestionProps {
  card: OpenQuestionType,
  index: number,
}

const OpenQuestion = ({ card, index }: OpenQuestionProps) => {
  const [answer, setAnswer] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const isIOS = Platform.OS === 'ios';
  const style = styles(isSelected);

  if (!card || card.template !== OPEN_QUESTION) return null;

  // const expectedColors = answer[selectedAnswerIndex] === card.qcuGoodAnswer
  //   ? { button: GREEN['600'], background: GREEN['100'], text: GREEN['800'] }
  //   : { button: ORANGE['600'], background: ORANGE['100'], text: ORANGE['800'] };
  // const style = styles(isSelected, expectedColors.background, expectedColors.text);

  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={{ flex: 1 }} >
      { !isSelected &&
        <CardHeader />
      }
      <ScrollView contentContainerStyle={style.container}>
        <Text style={style.question}>{card.question}</Text>
        <View style={style.inputContainer}>
          <AnswerField onChangeText={(text) => { setAnswer(text); } }
            onSelect={(selected) => { setIsSelected(selected); }} />
        </View>
        {/* <Text>{answer}</Text> */}
      </ScrollView>
      <QuestionCardFooter index={index} arrowColor={PINK['500']} buttonColor={PINK['500']} />
    </KeyboardAvoidingView>
  );
};

const styles = (isSelected: boolean) => StyleSheet.create({
  container: {
    flexGrow: 1,
    marginBottom: MARGIN.LG,
  },
  question: {
    ...FIRA_SANS_REGULAR.LG,
    color: GREY['800'],
    marginHorizontal: MARGIN.LG,
    marginBottom: MARGIN.XL,
    marginTop: isSelected ? MARGIN.MD : 0,
  },
  inputContainer: {
    flexGrow: 1,
    marginHorizontal: MARGIN.MD,
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(OpenQuestion);
