import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CardType } from '../../../types/CardType';
import IconButton from '../../../components/IconButton';
import { GREY, PINK } from '../../../styles/colors';
import { MARGIN, ICON } from '../../../styles/metrics';
import { NUNITO_REGULAR_BOLD_ITALIC } from '../../../styles/fonts';
import ArrowButton from '../../../components/ArrowButton';

interface TransitionCardProps {
  card: CardType,
  onPressExitbutton: () => void,
  onPressNext: () => void,
  onPressBack: () => void,
  onFocus?: (type: string) => void,
}

const TransitionCard = ({ card, onPressExitbutton, onPressNext, onPressBack, onFocus }: TransitionCardProps) => {
  const isFocused = useIsFocused();
  if (onFocus && isFocused) onFocus('transition');

  return (
    <View style={styles.container}>
      <IconButton name='x-circle' onPress={onPressExitbutton} size={ICON.LG}
        color={GREY['000']} style={styles.closeButton} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{card?.title}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ArrowButton direction={'left'} onPress={onPressBack}/>
        <ArrowButton direction={'right'} onPress={onPressNext}/>
      </View>
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
    marginTop: MARGIN.DOUBLEMD,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    ...NUNITO_REGULAR_BOLD_ITALIC.XL,
    textAlign: 'center',
    color: GREY['000'],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TransitionCard;
