import React, { useEffect, useState, ComponentType } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import ZoomImage from '../../../../components/ZoomImage';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { markdownStyle } from '../../../../styles/common';
import { StateType } from '../../../../types/store/StoreType';
import { TextMediaType } from '../../../../types/CardType';
import styles from './styles';
import { CARD_MEDIA_MAX_HEIGHT } from '../../../../styles/metrics';
import FooterGradient from '../../../../components/design/FooterGradient';
import { IMAGE, VIDEO, AUDIO } from '../../../../core/data/constants';
import NiVideo from '../../../../components/cards/Video';
import NiAudio from '../../../../components/cards/Audio';

interface TextMediaCardProps {
  card: TextMediaType,
  index: number,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
  setIsLeftSwipeEnabled: (boolean) => void,
}

const TextMediaCard: ComponentType<any> = ({
  card,
  index,
  isLoading,
  setIsRightSwipeEnabled,
  setIsLeftSwipeEnabled,
}: TextMediaCardProps) => {
  const [mediaHeight, setMediaHeight] = useState<number>(CARD_MEDIA_MAX_HEIGHT);
  const [mediaType, setMediaType] = useState<string>('');
  const [mediaSource, setMediaSource] = useState<{ uri: string } | undefined>();
  const [zoomImage, setZoomImage] = useState<boolean>(false);

  useEffect(() => setIsRightSwipeEnabled(true));
  useEffect(() => {
    setIsRightSwipeEnabled(!zoomImage);
    setIsLeftSwipeEnabled(!zoomImage);
  }, [zoomImage, setIsRightSwipeEnabled, setIsLeftSwipeEnabled]);

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
        <Markdown style={markdownStyle(cardsStyle.text)}>{card.text}</Markdown>
        {mediaType === IMAGE && !!mediaSource &&
          <TouchableOpacity onPress={() => setZoomImage(true)}>
            <Image source={mediaSource} style={[cardsStyle.media, styleWithHeight.media]} />
          </TouchableOpacity>}
        {mediaType === VIDEO && !!mediaSource && <NiVideo mediaSource={mediaSource} />}
        {mediaType === AUDIO && !!mediaSource && <NiAudio mediaSource={mediaSource} />}
      </ScrollView>
      <FooterGradient />
      <CardFooter index={index} />
      {zoomImage && mediaSource &&
        <ZoomImage image={mediaSource} setZoomImage={setZoomImage} />}
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TextMediaCard);
