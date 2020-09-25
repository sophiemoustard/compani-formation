import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../../components/cards/CardHeader';
import CardFooter from '../../../components/cards/CardFooter';
import { getCard } from '../../../store/activities/selectors';
import { MARGIN } from '../../../styles/metrics';
import cardsStyle from '../../../styles/cards';
import { TitleTextType } from '../../../types/CardType';
import { TITLE_TEXT } from '../../../core/data/constants';
import { StateType } from '../../../types/store/StoreType';

interface TitleTextCardProps {
  card: TitleTextType,
  index: number,
}

const TitleTextCard = ({ card, index }: TitleTextCardProps) => {
  if (!card || card.template !== TITLE_TEXT) return null;

  return (
    <>
      <CardHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Text style={cardsStyle.text}>{card.text}</Text>
      </ScrollView>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.MD,
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TitleTextCard);
