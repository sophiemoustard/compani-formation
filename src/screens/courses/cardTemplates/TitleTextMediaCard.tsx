/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, Text, Image } from 'react-native';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import CardFooter from '../../../components/cards/CardFooter';
import { MARGIN, BORDER_RADIUS } from '../../../styles/metrics';
import commonStyle from '../../../styles/common';

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
      <ScrollView style={styles.container}>
        <Text style={commonStyle.cardTitle}>{card.title}</Text>
        <Text style={commonStyle.cardText}>{card.text}</Text>
        { !!imageSource && <Image source={imageSource} style={styles.image}/> }
      </ScrollView>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.LG,
  },
  image: {
    resizeMode: 'contain',
    height: 150,
    borderRadius: BORDER_RADIUS.MD,
  },
});

export default TitleTextMediaCard;
