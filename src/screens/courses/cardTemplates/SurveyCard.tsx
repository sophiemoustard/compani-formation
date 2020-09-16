import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Col, Grid } from 'react-native-easy-grid';
import { StateType } from '../../../../src/types/StoreType';
import { getCard } from '../../../store/selectors';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import { FIRA_SANS_REGULAR } from '../../../styles/fonts';
import { GREY, PINK, WHITE } from '../../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN } from '../../../styles/metrics';
import QuestionCardFooter, { rightButtonStateType } from '../../../components/cards/QuestionCardFooter';

interface SurveyCard {
  card: CardType,
  index: number
}

const SurveyCard = ({ card, index }: SurveyCard) => {
  const scores = Array.from({ length: 10 }, (_, i) => i + 1);
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  if (!card) return null;

  const onPressScore = (score: number) => {
    setSelectedScore(score);
  };

  const scoreItem = (score) => {
    const isSelectedScore = score === selectedScore;

    return (
      <TouchableOpacity onPress={() => onPressScore(score)}>
        <Col style={styles(isSelectedScore, score).col}>
          <Text style={styles(isSelectedScore).scoreText}>{score}</Text>
        </Col>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CardHeader />
      <View style={styles().container}>
        <Text style={styles().question}>{card.question}</Text>
        <View style={styles().scoresListContainer}>
          <View style={styles().scoresListBorder}>
            <View style={styles().scoresList}>
              <Grid>
                {scores.map(score => scoreItem(score))}
              </Grid>
            </View>
          </View>
          <View style={styles().labels}>
            {card.label?.left && <Text>{card.label.left}</Text>}
            {card.label?.right && <Text>{card.label.right}</Text>}
          </View>
        </View>
      </View>
      <View>
        <QuestionCardFooter index={index} rightButtonCaption='Valider'
          rightButtonState={!selectedScore ? rightButtonStateType.LOCKED : rightButtonStateType.UNLOCKED} />
      </View>
    </View>
  );
};

const styles = (isSelectedScore?: boolean, score?: number) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.LG,
  },
  question: {
    ...FIRA_SANS_REGULAR.LG,
    color: GREY['800'],
    justifyContent: 'flex-start',
  },
  scoresListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scoresListBorder: {
    borderWidth: BORDER_WIDTH,
    borderColor: PINK[600],
    borderRadius: BORDER_RADIUS.XS,
  },
  scoresList: {
    aspectRatio: 10,
  },
  col: {
    aspectRatio: 1,
    justifyContent: 'center',
    backgroundColor: isSelectedScore ? PINK[600] : PINK[100],
    borderLeftWidth: score && score > 1 ? BORDER_WIDTH : 0,
    borderLeftColor: PINK[600],
    borderBottomLeftRadius: score && score === 1 ? BORDER_RADIUS.XS : 0,
    borderTopLeftRadius: score && score === 1 ? BORDER_RADIUS.XS : 0,
    borderBottomRightRadius: score && score === 10 ? BORDER_RADIUS.XS : 0,
    borderTopRightRadius: score && score === 10 ? BORDER_RADIUS.XS : 0,
  },
  scoreText: {
    ...FIRA_SANS_REGULAR.MD,
    textAlign: 'center',
    color: isSelectedScore ? WHITE : PINK[600],
  },
  separator: {
    borderLeftWidth: BORDER_WIDTH,
    borderLeftColor: PINK[600],
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.cardIndex });

export default connect(mapStateToProps)(SurveyCard);
