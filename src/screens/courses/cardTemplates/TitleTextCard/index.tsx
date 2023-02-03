import { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/cards/selectors';
import cardsStyle from '../../../../styles/cards';
import { markdownStyle } from '../../../../styles/common';
import { TitleTextType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import styles from './styles';

interface TitleTextCardProps {
  card: TitleTextType,
  index: number | null,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean: boolean) => void,
}

const TitleTextCard = ({ card, index, isLoading, setIsRightSwipeEnabled }: TitleTextCardProps) => {
  useEffect(() => setIsRightSwipeEnabled(true));

  if (isLoading) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <CardHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Markdown style={markdownStyle(cardsStyle.text)}>{card.text}</Markdown>
      </ScrollView>
      <CardFooter index={index} />
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.cards.cardIndex });

export default connect(mapStateToProps)(TitleTextCard);
