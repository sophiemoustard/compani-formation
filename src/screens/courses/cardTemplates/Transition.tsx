import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CardType } from '../../../types/CardType';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN } from '../../../styles/metrics';
import { NUNITO_REGULAR_BOLD_ITALIC } from '../../../styles/fonts';
import CardFooter from '../../../components/cards/CardFooter';
import CardHeader from '../../../components/cards/CardHeader';

interface TransitionProps {
  card: CardType,
  index: number,
  onPressExitButton: () => void,
}

const Transition = ({ card, index, onPressExitButton }: TransitionProps) => (
  <View style={styles.container}>
    <CardHeader onPress={onPressExitButton} color={GREY['000']} />
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{card.title}</Text>
    </View>
    <CardFooter index={index} template={card.template} color={GREY['000']} />
  </View>
);

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
    color: GREY['000'],
    marginHorizontal: MARGIN.MD,
  },
});

export default Transition;
