import { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Markdown from 'react-native-markdown-display';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import ZoomImage from '../../../../components/ZoomImage';
import Selectors from '../../../../store/cards/selectors';
import cardsStyle from '../../../../styles/cards';
import { markdownStyle } from '../../../../styles/common';
import { StateType } from '../../../../types/store/StoreType';
import { TextMediaType } from '../../../../types/CardType';
import { CacheType } from '../../../../types/CacheType';
import styles from './styles';
import { CARD_MEDIA_MAX_HEIGHT } from '../../../../styles/metrics';
import FooterGradient from '../../../../components/design/FooterGradient';
import { IMAGE, VIDEO, AUDIO } from '../../../../core/data/constants';
import NiVideo from '../../../../components/cards/Video';
import NiAudio from '../../../../components/cards/Audio';
import NiImage from '../../../../components/cards/Image';

interface TextMediaCardProps {
  card: TextMediaType,
  index: number | null,
  isLoading: boolean,
  setIsRightSwipeEnabled: (boolean) => void,
  setIsLeftSwipeEnabled: (boolean) => void,
}

const TextMediaCard = ({
  card,
  index,
  isLoading,
  setIsRightSwipeEnabled,
  setIsLeftSwipeEnabled,
}: TextMediaCardProps) => {
  const [mediaHeight, setMediaHeight] = useState<number>(CARD_MEDIA_MAX_HEIGHT);
  const [mediaType, setMediaType] = useState<string>('');
  const [mediaSource, setMediaSource] = useState<{ uri: string, cache?: CacheType } | undefined>();
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
      setMediaSource(card.media?.link
        ? { uri: card.media.link, ...(card?.media?.type === IMAGE && { cache: 'force-cache' }) }
        : undefined);
    }
  }, [card, isLoading]);

  if (isLoading) return null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <CardHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Markdown style={markdownStyle(cardsStyle.text)}>{card.text}</Markdown>
        {mediaType === IMAGE && !!mediaSource &&
          <NiImage onPress={() => setZoomImage(true)} source={mediaSource} imgHeight={mediaHeight} />}
        {mediaType === VIDEO && !!mediaSource && <NiVideo mediaSource={mediaSource} />}
        {mediaType === AUDIO && !!mediaSource && <NiAudio mediaSource={mediaSource} />}
      </ScrollView>
      <FooterGradient />
      <CardFooter index={index} />
      {zoomImage && mediaSource &&
        <ZoomImage image={mediaSource} setZoomImage={setZoomImage} />}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.cards.cardIndex });

export default connect(mapStateToProps)(TextMediaCard);
