import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CardType } from '../../../types/CardType';
import IconButton from '../../../components/IconButton';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN, ICON } from '../../../styles/metrics';
import { NUNITO_REGULAR_BOLD_ITALIC } from '../../../styles/fonts';
import Footer from '../../../components/cards/Footer';
import { TRANSITION } from '../../../core/data/constants';

interface TransitionCardProps {
  card: CardType,
  index: number,
  onPressExitButton: () => void,
  onFocus?: (type: string) => void,
}

const TransitionCard = ({ card, index, onPressExitButton, onFocus }: TransitionCardProps) => {
  const isFocused = useIsFocused();
  if (onFocus && isFocused) onFocus(TRANSITION);

  return (
    <View style={styles.container}>
      <IconButton name='x-circle' onPress={onPressExitButton} size={ICON.LG}
        color={GREY['000']} style={styles.closeButton} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{card.title}</Text>
      </View>
      <Footer index={index} template={ card.template } color={GREY['000']}/>
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
    color: GREY['000'],
  },
});

export default TransitionCard;
