import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import shuffle from 'lodash/shuffle'
import { StateType } from '../../../../src/types/StoreType';
import { getCard } from '../../../store/selectors';
import { CardType } from '../../../types/CardType';

interface SingleChoiceQuestionCard {
  card: CardType,
}

const SingleChoiceQuestionCard = ({ card }: SingleChoiceQuestionCard) => {
  if (!card || !card.falsyAnswers) return null;

  return (
    <View>
      <Text>{card.question}</Text>
      <FlatList data= {shuffle([...card.falsyAnswers, card.qcuGoodAnswer])}
        keyExtractor={item => item} renderItem={({ item }) => <Text> { item } </Text>} />
      <Text>{card.qcuGoodAnswer}</Text>
      <Text>{card.explanation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state: StateType) => ({ card: getCard(state) });

export default connect(mapStateToProps)(SingleChoiceQuestionCard);
