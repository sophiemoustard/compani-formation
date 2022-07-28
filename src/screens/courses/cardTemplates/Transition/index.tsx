import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { WHITE } from '../../../../styles/colors';
import CardFooter from '../../../../components/cards/CardFooter';
import CardHeader from '../../../../components/cards/CardHeader';
import Selectors from '../../../../store/cards/selectors';
import { TransitionType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import styles from './styles';

interface TransitionProps {
  index: number | null,
  card: TransitionType,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
}

const Transition = ({ index, card, isLoading, setIsRightSwipeEnabled }: TransitionProps) => {
  useEffect(() => setIsRightSwipeEnabled(true));

  if (isLoading) return null;

  return (
    <View style={styles.container}>
      <CardHeader color={WHITE} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{card.title}</Text>
      </View>
      <CardFooter index={index} color={WHITE} />
    </View>
  );
};

const mapStateToProps = (state: StateType) => ({ index: state.cards.cardIndex, card: Selectors.getCard(state) });

export default connect(mapStateToProps)(Transition);
