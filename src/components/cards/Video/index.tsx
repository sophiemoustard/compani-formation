import React, { useState, useRef } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform } from 'react-native';
import { Video } from 'expo-av';
import styles from './styles';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../../components/IconButton';
import { GREY } from '../../../styles/colors';

interface NiVideoProps {
  mediaSource: { uri: string } | undefined,
}

const NiVideo = ({ mediaSource }: NiVideoProps) => {
  const [playVisible, setPlayVisible] = useState<boolean>(true);
  const [nativeControlsVisible, setNativeControlsVisible] = useState<boolean>(false);
  const videoRef = useRef<Video>(null);
  const isIos = Platform.OS === 'ios';
  let iosVersion;
  if (isIos) iosVersion = Platform.Version;

  const displayFullscreen = () => {
    if (!isIos) videoRef.current?.presentFullscreenPlayer();
    videoRef.current?.playAsync();
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isPlaying) setPlayVisible(false);
    else setPlayVisible(true);
  };

  // eslint-disable-next-line consistent-return
  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (Platform.OS === 'android') {
      switch (fullscreenUpdate) {
        case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
          return ScreenOrientation.unlockAsync();
        case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
          return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        default:
      }
    }
  };

  const onReadyForDisplay = ({ status }) => {
    if (status.isLoaded) setNativeControlsVisible(true);
  };

  return (
    <>
      {playVisible && (!isIos || (isIos && iosVersion === '14.1')) &&
        <IconButton name='play-circle' size={ICON.XXL} onPress={displayFullscreen} color={GREY[100]}
          style={styles.play} />}
      <Video ref={videoRef} useNativeControls={nativeControlsVisible} resizeMode='contain' source={mediaSource}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate} onFullscreenUpdate={onFullscreenUpdate} style={styles.media}
        onReadyForDisplay={onReadyForDisplay} />
    </>
  );
};

export default NiVideo;
