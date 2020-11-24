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
import { AUDIO, IMAGE, VIDEO } from '../../../../core/data/constants';
import FooterGradient from '../../../../components/design/FooterGradient';
import NiVideo from '../../../../components/cards/Video';
import NiAudio from '../../../../components/cards/Audio';

interface TitleTextMediaCardProps {
  card: TitleTextMediaType,
  index: number,
  isLoading: boolean,
}

const TitleTextMediaCard = ({ card, index, isLoading }: TitleTextMediaCardProps) => {
  const [mediaHeight, setMediaHeight] = useState<number>(CARD_MEDIA_MAX_HEIGHT);
  const [mediaType, setMediaType] = useState<string>('');
  const [mediaSource, setMediaSource] = useState<{ uri: string } | undefined>();

  useEffect(() => {
    if (!isLoading) {
      if (card?.media?.link && card?.media?.type === IMAGE) {
        Image.getSize(card.media?.link || '', (width, height) => {
          setMediaHeight(Math.min(height, CARD_MEDIA_MAX_HEIGHT));
        });
      }
      setMediaType(card?.media?.type);
      setMediaSource(card.media?.link ? { uri: card.media.link } : undefined);
    }
  }, [card, isLoading]);

  if (isLoading) return null;

  const styleWithHeight = styles(mediaHeight);

  return (
    <>
      <CardHeader />
      <ScrollView style={styleWithHeight.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Text style={cardsStyle.text}>{card.text}</Text>
        {mediaType === IMAGE && !!mediaSource &&
          <Image source={mediaSource} style={[cardsStyle.media, styleWithHeight.media]} />}
        {mediaType === VIDEO && !!mediaSource && <NiVideo mediaSource={mediaSource} />}
        {mediaType === AUDIO && !!mediaSource && <NiAudio mediaSource={mediaSource}/>}
      </ScrollView>
      <FooterGradient />
      <CardFooter index={index} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TitleTextMediaCard);
