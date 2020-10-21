import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { connect } from 'react-redux';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { StateType } from '../../../../types/store/StoreType';
import { TextMediaType } from '../../../../types/CardType';
import styles from './styles';
import { CARD_MEDIA_MAX_HEIGHT } from '../../../../styles/metrics';

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
        setImgHeight(Math.min(height, CARD_MEDIA_MAX_HEIGHT));
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
        <Markdown style={{ body: cardsStyle.text }}>{card.text}</Markdown>
        {!!imageSource && <Image source={imageSource} style={styleWithImgHeight.image} />}
      </ScrollView>
      <CardFooter index={index} template={card.template}/>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TextMediaCard);
