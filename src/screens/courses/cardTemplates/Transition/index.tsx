import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { WHITE } from '../../../../styles/colors';
import CardFooter from '../../../../components/cards/CardFooter';
import CardHeader from '../../../../components/cards/CardHeader';
import Selectors from '../../../../store/activities/selectors';
import { TransitionType } from '../../../../types/CardType';
import { TRANSITION } from '../../../../core/data/constants';
import { StateType } from '../../../../types/store/StoreType';
import styles from './style';

interface TransitionProps {
  index: number,
  card: TransitionType,
}

const Transition = ({ index, card }: TransitionProps) => {
  if (!card || card.template !== TRANSITION) return null;

  return (
    <View style={styles.container}>
      <CardHeader color={WHITE} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{card.title}</Text>
      </View>
      <CardFooter index={index} template={card.template} color={WHITE} />
    </View>
  );
};

const mapStateToProps = (state: StateType) => ({ index: state.activities.cardIndex, card: Selectors.getCard(state) });

export default connect(mapStateToProps)(Transition);
