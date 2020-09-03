/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import CardFooter from '../../../components/cards/CardFooter';

interface TitleTextMediaCardProps {
  card: CardType,
  index: number,
  onPressExitButton: () => void,
}

const TitleTextMediaCard = ({ card, index, onPressExitButton }: TitleTextMediaCardProps) => {
  const imageSource = card.media?.link ? { uri: card.media.link } : '';
  return (
    <>
      <CardHeader onPress={onPressExitButton} />
      <View style={styles.container}>
        <Text>{card.title}</Text>
        <Text>{card.text}</Text>
        { !!imageSource && <Image source={imageSource} /> }
      </View>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TitleTextMediaCard;
