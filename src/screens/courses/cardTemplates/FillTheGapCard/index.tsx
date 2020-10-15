import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { StateType } from '../../../../types/store/StoreType';
import Selectors from '../../../../store/activities/selectors';
import { FillTheGapType } from '../../../../types/CardType';
import CardHeader from '../../../../components/cards/CardHeader';
import { FILL_THE_GAPS } from '../../../../core/data/constants';
import cardsStyle from '../../../../styles/cards';
import styles from './styles';
import QuestionCardFooter from '../../../../components/cards/QuestionCardFooter';

interface FillTheGap {
  card: FillTheGapType,
  index: number
}

const FillTheGap = ({ card, index }: FillTheGap) => {
  if (!card || card.template !== FILL_THE_GAPS) return null;

  const goodAnswers = card.gappedText?.match(/<trou>[^<]*<\/trou>/g)?.map(rep => rep.replace(/<\/?trou>/g, '')) || [];
  const answers = shuffle([...card.falsyGapAnswers, ...goodAnswers]);

  const renderAnswers = () => <View style={styles.answersContainer}>
    {answers.map((txt, idx) => <Text style={styles.answer} key={`answer${idx}`}>{txt}</Text>)}
  </View>;

  const renderQuestion = (text) => {
    const splittedText = text.split(/<trou>[^<]*<\/trou>/g);
    return <View style={[cardsStyle.question, styles.questionContainer]}>
      {
        splittedText.map((txt, idx) => {
          if (idx === 0 && txt === '') return <View style={styles.gapContainer} key={`gap${idx}`} />;
          if (idx === splittedText.length - 1 && txt === '') return null;
          if (idx < splittedText.length - 1) {
            return <>
              <Text style={styles.question} key={`text${idx}`}>{txt}</Text>
              <View style={styles.gapContainer} key={`gap${idx}`} />
            </>;
          }
          return <Text style={styles.question} key={`text${idx}`}>{txt}</Text>;
        })
      }
    </View>;
  };

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {renderQuestion(card.gappedText)}
        {renderAnswers()}
      </ScrollView>
      <QuestionCardFooter index={index} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(FillTheGap);
