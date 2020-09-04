import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import { CardType } from '../../../types/CardType';
import CardHeader from '../../../components/cards/CardHeader';
import CardFooter from '../../../components/cards/CardFooter';
import { MARGIN, BORDER_RADIUS } from '../../../styles/metrics';
import cardsStyle from '../../../styles/cards';

interface TitleTextMediaCardProps {
  card: CardType,
  index: number,
  onPressExitButton: () => void,
}

interface StylesProps {
  imgHeight: number,
}

const TitleTextMediaCard = ({ card, index, onPressExitButton }: TitleTextMediaCardProps) => {
  const imageSource = card.media?.link ? { uri: card.media.link } : '';
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (card.media?.link) {
      Image.getSize(card.media?.link || '', (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImgHeight(imageHeight);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styleWithImgHeight = styles({ imgHeight });

  return (
    <>
      <CardHeader onPress={onPressExitButton} />
      <ScrollView style={styleWithImgHeight.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Text style={cardsStyle.text}>{card.text}</Text>
        {!!imageSource && <Image source={imageSource} style={styleWithImgHeight.image}/>}
      </ScrollView>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const styles = ({ imgHeight }: StylesProps) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: MARGIN.LG,
  },
  image: {
    resizeMode: 'cover',
    height: imgHeight,
    borderRadius: BORDER_RADIUS.MD,
  },
});

export default TitleTextMediaCard;
