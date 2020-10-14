import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
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
  const answers = card.falsyGapAnswers.concat(goodAnswers);

  const renderItem = item => <Text>{item}</Text>;

  const renderQuestion = (text) => {
    const splittedText = text.split(/<trou>[^<]*<\/trou>/g);

    return <> {
      splittedText.map((txt, idx) => {
        if (txt === '') return <Text>TROU</Text>;
        return <Text key={idx}>{txt}</Text>;
      })
    }
    </>;
  };

  return (
    <>
      <CardHeader />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.question}>{renderQuestion(card.gappedText)}</Text>
        <FlatList data={answers} keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => renderItem(item)} />
      </ScrollView>
      <QuestionCardFooter index={index} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(FillTheGap);
