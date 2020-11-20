import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../IconButton';
import { GREY } from '../../../styles/colors';
import styles from './styles';
import { IONICONS } from '../../../core/data/constants';

interface NiAudioProps {
  mediaSource: { uri: string } | undefined,
}

const NiAudio = ({ mediaSource }: NiAudioProps) => {
  const [soundObject] = useState(new Audio.Sound()); // state needed because of the useEffect
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadAudio() {
      try {
        const status = await soundObject.getStatusAsync();
        if (mediaSource && !status.isLoaded) await soundObject.loadAsync(mediaSource);
      } catch (e) {
        console.error(e);
      }
    }

    async function unloadAudio() {
      try {
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded) await soundObject.unloadAsync();
      } catch (e) {
        console.error(e);
      }
    }

    const onPlaybackStatusUpdate = async (playbackStatus) => {
      setIsPlaying(playbackStatus?.isPlaying || false);
      setIsLoaded(playbackStatus?.isLoaded || false);
    };
    soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    loadAudio();
    return () => { unloadAudio(); soundObject.setOnPlaybackStatusUpdate(() => {}); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playOrPauseAudio = async () => {
    try {
      const status = await soundObject.getStatusAsync();
      if (mediaSource && status.isLoaded && !status.isPlaying) {
        const { positionMillis, durationMillis } = status;
        const position = !positionMillis || positionMillis === durationMillis ? 0 : positionMillis;
        await soundObject.playFromPositionAsync(position);
      }
      if (mediaSource && status.isLoaded && status.isPlaying) await soundObject.pauseAsync();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <IconButton name={isPlaying ? 'ios-pause' : 'ios-play'} size={ICON.MD} onPress={playOrPauseAudio}
        color={GREY[800]} iconFamily={IONICONS} style={styles.icon} disabled={!isLoaded} />
    </View>
  );
};

export default NiAudio;
