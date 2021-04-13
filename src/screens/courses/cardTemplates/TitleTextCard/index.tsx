import React, { useEffect, ComponentType } from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { markdownStyle } from '../../../../styles/common';
import { TitleTextType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import styles from './styles';

interface TitleTextCardProps {
  card: TitleTextType,
  index: number,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
}

const TitleTextCard: ComponentType<any> = ({ card, index, isLoading, setIsRightSwipeEnabled }: TitleTextCardProps) => {
  useEffect(() => setIsRightSwipeEnabled(true));

  if (isLoading) return null;

  return (
    <>
      <CardHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Markdown style={markdownStyle(cardsStyle.text)}>{card.text}</Markdown>
      </ScrollView>
      <CardFooter index={index} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TitleTextCard);
