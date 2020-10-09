import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { TitleTextType } from '../../../../types/CardType';
import { TITLE_TEXT } from '../../../../core/data/constants';
import { StateType } from '../../../../types/store/StoreType';
import styles from './style';

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

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TitleTextCard);
