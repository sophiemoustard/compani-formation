import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { PINK, WHITE } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { NUNITO_REGULAR_BOLD_ITALIC } from '../../../styles/fonts';
import CardFooter from '../../../components/cards/CardFooter';
import CardHeader from '../../../components/cards/CardHeader';
import { getCard } from '../../../store/selectors';
import { StateType } from '../../../types/StoreType';
import { CardType } from '../../../types/CardType';

interface TransitionProps {
  index: number,
  card: CardType,
}

const Transition = ({ index, card }: TransitionProps) => {
  if (!card) return null;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PINK[500],
  },
  closeButton: {
    margin: MARGIN.MD,
  },
  titleContainer: {
    marginTop: MARGIN.XL,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...NUNITO_REGULAR_BOLD_ITALIC.XL,
    textAlign: 'center',
    color: WHITE,
    marginHorizontal: MARGIN.MD,
  },
});

const mapStateToProps = (state: StateType) => ({ index: state.cardIndex, card: getCard(state) });

export default connect(mapStateToProps)(Transition);
