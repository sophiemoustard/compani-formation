import { useState, useRef } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform, View } from 'react-native';
import { Video, VideoFullscreenUpdate, ResizeMode } from 'expo-av';
import styles from './styles';
import { ICON } from '../../../styles/metrics';
import FeatherButton from '../../../components/icons/FeatherButton';
import { GREY } from '../../../styles/colors';
import Spinner from '../../Spinner';
import { isIOS } from '../../../core/data/constants';

interface NiVideoProps {
  mediaSource: { uri: string } | undefined,
}

const NiVideo = ({ mediaSource }: NiVideoProps) => {
  const isIosVersionWithPlayButton = isIOS && Platform.Version === '14.1';
  const [playVisible, setPlayVisible] = useState<boolean>(isIosVersionWithPlayButton);
  const [nativeControlsVisible, setNativeControlsVisible] = useState<boolean>(false);
  const videoRef = useRef<Video>(null);
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  const displayFullscreen = () => {
    videoRef.current?.playAsync();
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (isIosVersionWithPlayButton) {
      if (playbackStatus.isPlaying) setPlayVisible(false);
      else setPlayVisible(true);
    }
  };

  // eslint-disable-next-line consistent-return
  const onFullscreenUpdate = async ({ fullscreenUpdate }) => {
    if (Platform.OS === 'android') {
      switch (fullscreenUpdate) {
        case VideoFullscreenUpdate.PLAYER_DID_PRESENT:
          return ScreenOrientation.unlockAsync();
        case VideoFullscreenUpdate.PLAYER_WILL_DISMISS:
          return ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        default:
      }
    }
  };

  const onReadyForDisplay = (event) => {
    if (event.status?.isLoaded) setNativeControlsVisible(true);
  };
  const style = styles(isMediaLoading);

  return (
    <>
      {isMediaLoading && <Spinner />}
      <View>
        {isIosVersionWithPlayButton && playVisible &&
        <FeatherButton name='play-circle' size={ICON.XXL} onPress={displayFullscreen} color={GREY[100]}
          style={style.play} />}
        <Video ref={videoRef} useNativeControls={nativeControlsVisible} resizeMode={ResizeMode.CONTAIN}
          source={mediaSource} onPlaybackStatusUpdate={onPlaybackStatusUpdate} onFullscreenUpdate={onFullscreenUpdate}
          style={style.media} onReadyForDisplay={onReadyForDisplay} onLoadStart={() => setIsMediaLoading(true)}
          onLoad={() => setIsMediaLoading(false)} />
      </View>
    </>
  );
};

export default NiVideo;
