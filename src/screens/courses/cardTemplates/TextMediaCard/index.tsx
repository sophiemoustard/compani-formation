import React, { useEffect, useState, useRef } from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { Video } from 'expo-av';
import { connect } from 'react-redux';
import CardHeader from '../../../../components/cards/CardHeader';
import CardFooter from '../../../../components/cards/CardFooter';
import Selectors from '../../../../store/activities/selectors';
import cardsStyle from '../../../../styles/cards';
import { StateType } from '../../../../types/store/StoreType';
import { TextMediaType } from '../../../../types/CardType';
import styles from './styles';
import { CARD_MEDIA_MAX_HEIGHT, ICON } from '../../../../styles/metrics';
import FooterGradient from '../../../../components/design/FooterGradient';
import { IMAGE, VIDEO } from '../../../../core/data/constants';
import IconButton from '../../../../components/IconButton';
import { GREY } from '../../../../styles/colors';

interface TextMediaCardProps {
  card: TextMediaType,
  index: number,
  isLoading: boolean,
}

const TextMediaCard = ({ card, index, isLoading }: TextMediaCardProps) => {
  const [mediaHeight, setMediaHeight] = useState<number>(CARD_MEDIA_MAX_HEIGHT);
  const [playVisible, setPlayVisible] = useState<Boolean>(true);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (!isLoading && card?.media?.link && card?.media?.type === IMAGE) {
      Image.getSize(card.media?.link || '', (width, height) => {
        setMediaHeight(Math.min(height, CARD_MEDIA_MAX_HEIGHT));
      });
    }
  }, [card, isLoading]);

  if (isLoading) return null;

  const mediaSource = card.media?.link ? { uri: card.media.link } : '';
  const cardType = card?.media?.type;
  const styleWithHeight = styles(mediaHeight);

  const displayFullScreen = () => {
    videoRef.current?.presentFullscreenPlayer();
    videoRef.current?.playAsync();
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) setPlayVisible(false);
    else setPlayVisible(true);
  };

  return (
    <>
      <CardHeader />
      <ScrollView style={styleWithHeight.container} showsVerticalScrollIndicator={false}>
        <Text style={cardsStyle.text}>{card.text}</Text>
        {cardType === IMAGE && !!mediaSource &&
          <Image source={mediaSource} style={[cardsStyle.media, styleWithHeight.media]} />}
        {cardType === VIDEO && !!mediaSource &&
            <>
              {playVisible &&
                <IconButton name='play-circle' size={ICON.XXL} onPress={displayFullScreen}
                  color={GREY[100]} style={styleWithHeight.play} />}
              <Video ref={videoRef} useNativeControls resizeMode='contain' source={mediaSource}
                style={styleWithHeight.media} onPlaybackStatusUpdate={onPlaybackStatusUpdate} />
            </>}
      </ScrollView>
      <FooterGradient />
      <CardFooter index={index} />
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ card: Selectors.getCard(state), index: state.activities.cardIndex });

export default connect(mapStateToProps)(TextMediaCard);
