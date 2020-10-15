import React, { useEffect, useState } from 'react';
import { Text, Image, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { StateType } from '../../../../types/store/StoreType';
import { TextMediaType } from '../../../../types/CardType';
import styles from './styles';

interface TextMediaCardProps {
  card: TextMediaType,
  index: number,
  isFocused: boolean,
}

const TextMediaCard = ({ card, index, isFocused }: TextMediaCardProps) => {
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

  if (!isFocused) return null;

  const imageSource = card.media?.link ? { uri: card.media.link } : '';
  const styleWithImgHeight = styles(imgHeight);

  return (
    <>
      <CardHeader />
      <ScrollView style={styleWithImgHeight.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.text}>{card.text}</Text>
        {!!imageSource && <Image source={imageSource} style={styleWithImgHeight.image} />}
      </ScrollView>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TextMediaCard);
