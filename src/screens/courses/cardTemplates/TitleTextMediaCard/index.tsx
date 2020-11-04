import React, { useEffect, useState } from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { TitleTextMediaType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import styles from './styles';
import { CARD_MEDIA_MAX_HEIGHT } from '../../../../styles/metrics';
import FooterGradient from '../../../../components/design/FooterGradient';

interface TitleTextMediaCardProps {
  card: TitleTextMediaType,
  index: number,
  isLoading: boolean,
}

const TitleTextMediaCard = ({ card, index, isLoading }: TitleTextMediaCardProps) => {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (card?.media?.link) {
      Image.getSize(card.media?.link || '', (width, height) => {
        setImgHeight(Math.min(height, CARD_MEDIA_MAX_HEIGHT));
      });
    }
  }, [card]);

  if (isLoading) return null;

  const imageSource = card.media?.link ? { uri: card.media.link } : '';
  const styleWithImgHeight = styles(imgHeight);

  return (
    <>
      <CardHeader />
      <ScrollView style={styleWithImgHeight.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Text style={cardsStyle.text}>{card.text}</Text>
        {!!imageSource && <Image source={imageSource} style={styleWithImgHeight.image} />}
      </ScrollView>
      <FooterGradient />
      <CardFooter index={index} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TitleTextMediaCard);
