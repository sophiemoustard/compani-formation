import React, { useState, useRef } from 'react';
import { Video } from 'expo-av';
import styles from './styles';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../../components/IconButton';
import { GREY } from '../../../styles/colors';

interface NiVideoProps {
  mediaSource: { uri: string } | undefined,
}

const NiVideo = ({ mediaSource }: NiVideoProps) => {
  const [playVisible, setPlayVisible] = useState<Boolean>(true);
  const videoRef = useRef<Video>(null);

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
      {playVisible &&
        <IconButton name='play-circle' size={ICON.XXL} onPress={displayFullScreen} color={GREY[100]}
          style={styles.play} />}
      <Video ref={videoRef} useNativeControls resizeMode='contain' source={mediaSource} style={styles.media}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate} />
    </>
  );
};

export default NiVideo;
