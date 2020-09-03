import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { CardType } from '../../../types/CardType';
import CardFooter from '../../../components/cards/CardFooter';
import { TITLE_TEXT_MEDIA } from '../../../core/data/constants';
import CardHeader from '../../../components/cards/CardHeader';

interface TitleTextMediaCardProps {
  card: CardType,
  index: number,
  onPressExitButton: () => void,
  onFocus?: (type: string) => void,
}

const TitleTextMediaCard = ({ card, index, onPressExitButton, onFocus }: TitleTextMediaCardProps) => {
  const isFocused = useIsFocused();
  if (onFocus && isFocused) onFocus(TITLE_TEXT_MEDIA);

  return (
    <View style={styles.container}>
      <CardHeader onPress={onPressExitButton}/>
      <View>
        <Text>{card.title}</Text>
        <Text>{card.text}</Text>
        <Image source={require(card.media?.link || '')} />
      </View>
      <CardFooter index={index} template={card.template}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TitleTextMediaCard;
