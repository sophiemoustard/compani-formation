import { useEffect, useState } from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import ZoomImage from '../../../../components/ZoomImage';
import Selectors from '../../../../store/cards/selectors';
import cardsStyle from '../../../../styles/cards';
import { markdownStyle } from '../../../../styles/common';
import { TitleTextMediaType } from '../../../../types/CardType';
import { StateType } from '../../../../types/store/StoreType';
import { CacheType } from '../../../../types/CacheType';
import styles from './styles';
import { CARD_MEDIA_MAX_HEIGHT } from '../../../../styles/metrics';
import { AUDIO, IMAGE, VIDEO } from '../../../../core/data/constants';
import FooterGradient from '../../../../components/design/FooterGradient';
import NiVideo from '../../../../components/cards/Video';
import NiAudio from '../../../../components/cards/Audio';
import NiImage from '../../../../components/cards/Image';

interface TitleTextMediaCardProps {
  card: TitleTextMediaType,
  index: number | null,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
  setIsLeftSwipeEnabled: (boolean) => void,
}

const TitleTextMediaCard = ({
  card,
  index,
  isLoading,
  setIsRightSwipeEnabled,
  setIsLeftSwipeEnabled,
}: TitleTextMediaCardProps) => {
  const [mediaHeight, setMediaHeight] = useState<number>(CARD_MEDIA_MAX_HEIGHT);
  const [mediaType, setMediaType] = useState<string>('');
  const [mediaSource, setMediaSource] = useState<{ uri: string, cache?: CacheType } | undefined>();
  const [zoomImage, setZoomImage] = useState<boolean>(false);

  useEffect(() => { setIsRightSwipeEnabled(true); }, [setIsRightSwipeEnabled]);

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
      setMediaSource(card.media?.link
        ? { uri: card.media.link, ...(card?.media?.type === IMAGE && { cache: 'force-cache' }) }
        : undefined);
    }
  }, [card, isLoading]);

  if (isLoading) return null;

  return (
    <>
      <CardHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.title}>{card.title}</Text>
        <Markdown style={markdownStyle(cardsStyle.text)}>{card.text}</Markdown>
        {mediaType === IMAGE && !!mediaSource &&
          <NiImage onPress={() => setZoomImage(true)} source={mediaSource} imgHeight={mediaHeight} />}
        {mediaType === VIDEO && !!mediaSource && <NiVideo mediaSource={mediaSource} />}
        {mediaType === AUDIO && !!mediaSource && <NiAudio mediaSource={mediaSource}/>}
      </ScrollView>
      <FooterGradient />
      <CardFooter index={index} />
      {zoomImage && mediaSource &&
        <ZoomImage image={mediaSource} setZoomImage={setZoomImage} />}
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.cards.cardIndex });

export default connect(mapStateToProps)(TitleTextMediaCard);
