import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../../components/cards/CardHeader';
import CardFooter from '../../../components/cards/CardFooter';
import { getCard } from '../../../store/selectors';
import { MARGIN, BORDER_RADIUS } from '../../../styles/metrics';
import cardsStyle from '../../../styles/cards';
import { StateType } from '../../../types/StoreType';
import { CardType } from '../../../types/CardType';

interface TitleTextMediaCardProps {
  card: CardType,
  index: number,
}

interface StylesProps {
  imgHeight: number,
}

const TitleTextMediaCard = ({ card, index }: TitleTextMediaCardProps) => {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (card?.media?.link) {
      Image.getSize(card.media?.link || '', (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImgHeight(imageHeight);
      });
    }
  }, [card]);

  if (!card) return null;

  const imageSource = card.media?.link ? { uri: card.media.link } : '';
  const styleWithImgHeight = styles({ imgHeight });

  return (
    <>
      <CardHeader />
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
    marginHorizontal: MARGIN.MD,
  },
  image: {
    resizeMode: 'cover',
    height: imgHeight,
    borderRadius: BORDER_RADIUS.MD,
  },
});

const mapStateToProps = (state: StateType) => ({ card: getCard(state), index: state.cardIndex });

export default connect(mapStateToProps)(TitleTextMediaCard);
