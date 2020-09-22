import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { SurveyType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import QuestionCardFooter from '../../../components/cards/QuestionCardFooter';
import { StateType } from '../../../types/store/StoreType';
import { getCard } from '../../../store/activities/selectors';
import SurveyScoreSelector from '../../../components/cards/SurveyScoreSelector';
import { SURVEY } from '../../../core/data/constants';

interface SurveyCard {
  card: SurveyType,
  index: number
}

const SurveyCard = ({ card, index }: SurveyCard) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  if (!card || card.template !== SURVEY) return null;

  return (
    <View style={{ flex: 1 }}>
      <CardHeader />
      <View style={styles.container}>
        <Text style={styles.question}>{card.question}</Text>
        <View style={styles.surveyScoreContainer}>
          <SurveyScoreSelector onPressScore={score => setSelectedScore(score)} selectedScore={selectedScore} />
          <View style={styles.labels}>
            {card.label?.left && <Text>{card.label.left}</Text>}
            {card.label?.right && <Text>{card.label.right}</Text>}
          </View>
        </View>
      </View>
      <QuestionCardFooter index={index} buttonColor={selectedScore ? PINK['500'] : GREY['300']}
        arrowColor={PINK['500']} buttonCaption='Valider' buttonDisabled={!selectedScore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.LG,
  },
  surveyScoreContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    ...FIRA_SANS_REGULAR.LG,
    color: GREY['800'],
    justifyContent: 'flex-start',
  },
  labels: {
    marginTop: MARGIN.XL,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(SurveyCard);
