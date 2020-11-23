import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../IconButton';
import { GREY, PINK } from '../../../styles/colors';
import styles from './styles';
import { IONICONS } from '../../../core/data/constants';
import commonStyle from '../../../styles/common';

interface NiAudioProps {
  mediaSource: { uri: string } | undefined,
}

const NiAudio = ({ mediaSource }: NiAudioProps) => {
  const [soundObject] = useState(new Audio.Sound()); // state needed because of the useEffect
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const isUserMovingSlider = useRef(false);
  const [duration, setDuration] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  const loadAudio = async () => {
    try {
      let status = await soundObject.getStatusAsync();
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
        await soundObject.playFromPositionAsync(timeElapsed);
      }
      if (mediaSource && isLoaded && isPlaying) await soundObject.pauseAsync();
    } catch (e) {
      console.error(e);
    }
  };

  const playFromPosition = async (ms) => {
    if (isPlaying) await soundObject.playFromPositionAsync(ms);
    else setTimeElapsed(ms);
    isUserMovingSlider.current = false;
  };

  const millisToMinutesAndSeconds = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {isLoaded
          ? <IconButton name={isPlaying ? 'ios-pause' : 'ios-play'} size={ICON.MD} onPress={playOrPauseAudio}
            color={GREY[800]} iconFamily={IONICONS} style={styles.icon} />
          : <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />}
        <Text style={styles.timer}>{millisToMinutesAndSeconds(timeElapsed)}</Text>
        <Slider minimumValue={0} maximumValue={duration} minimumTrackTintColor={PINK[500]} value={timeElapsed}
          onSlidingComplete={playFromPosition} style={styles.track} onValueChange={setTimeElapsed}
          onSlidingStart={() => { isUserMovingSlider.current = true; }} />
        <Text style={styles.timer}>{millisToMinutesAndSeconds(duration - timeElapsed)}</Text>
      </View>
    </View>
  );
};

export default NiAudio;
