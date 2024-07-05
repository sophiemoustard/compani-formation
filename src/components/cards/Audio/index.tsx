import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { ICON } from '../../../styles/metrics';
import IoniconsButton from '../../icons/IoniconsButton';
import { GREY, PINK } from '../../../styles/colors';
import styles from './styles';
import commonStyle from '../../../styles/common';
import { isWeb } from '../../../core/data/constants';

interface NiAudioProps {
  mediaSource: { uri: string } | undefined,
}

const NiAudio = ({ mediaSource }: NiAudioProps) => {
  // eslint-disable-next-line react/hook-use-state
  const [soundObject] = useState(new Audio.Sound()); // state needed because of the useEffect
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isUserMovingSlider = useRef(false);
  const [duration, setDuration] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const loadAudio = async () => {
    try {
      let status = await soundObject.getStatusAsync();
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      if (mediaSource && !status.isLoaded) {
        status = await soundObject.loadAsync(mediaSource);
        if (status.isLoaded) setDuration(status.durationMillis || 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const unloadAudio = async () => {
    try {
      const status = await soundObject.getStatusAsync();
      if (status.isLoaded) await soundObject.unloadAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus: AVPlaybackStatus) => {
    setIsPlaying(playbackStatus.isLoaded ? playbackStatus.isPlaying : false);
    setIsLoaded(playbackStatus.isLoaded);
    if (!isUserMovingSlider.current) setTimeElapsed(playbackStatus.isLoaded ? playbackStatus.positionMillis : 0);
  };

  useEffect(() => {
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    loadAudio();

    return () => {
      unloadAudio();
      soundObject.setOnPlaybackStatusUpdate(() => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playOrPauseAudio = async () => {
    try {
      if (mediaSource && isLoaded && !isPlaying) {
        if (isWeb) await soundObject.playAsync();
        else if (timeElapsed === duration) await soundObject.playFromPositionAsync(0);
        else await soundObject.playFromPositionAsync(timeElapsed);
      }
      if (mediaSource && isLoaded && isPlaying) await soundObject.pauseAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const playFromPosition = async (ms: number) => {
    if (isPlaying) await soundObject.playFromPositionAsync(ms);
    else setTimeElapsed(ms);
    isUserMovingSlider.current = false;
  };

  const millisToMinutesAndSeconds = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderPlayer = (iconSize: number) => (
    isLoaded
      ? <IoniconsButton name={isPlaying ? 'pause' : 'play'} size={iconSize} onPress={playOrPauseAudio}
        color={GREY[800]} style={styles.icon} />
      : <ActivityIndicator style={[commonStyle.disabled, styles.icon]} color={GREY[800]} size={iconSize} />
  );

  return (
    isWeb
      ? <View style={styles.webContainer}>
        <Ionicons name="musical-note" size={250} style={styles.webBackgroundIcon} />
        {renderPlayer(ICON.XXXL)}
      </View>
      : <View style={styles.container}>
        {renderPlayer(ICON.MD)}
        <Text style={styles.timer}>{millisToMinutesAndSeconds(timeElapsed)}</Text>
        <Slider minimumValue={0} maximumValue={duration} minimumTrackTintColor={PINK[500]} thumbTintColor={PINK[500]}
          onSlidingComplete={playFromPosition} style={styles.track} onValueChange={setTimeElapsed} value={timeElapsed}
          onSlidingStart={() => { isUserMovingSlider.current = true; }} />
        <Text style={styles.timer}>{millisToMinutesAndSeconds(duration - timeElapsed)}</Text>
      </View>
  );
};

export default NiAudio;
