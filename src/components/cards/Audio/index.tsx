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

    loadAudio();
    return () => { unloadAudio(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playAudio = async () => {
    try {
      const status = await soundObject.getStatusAsync();
      if (mediaSource && status.isLoaded) await soundObject.playFromPositionAsync(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <IconButton name='ios-play' size={ICON.MD} onPress={playAudio} color={GREY[800]} iconFamily={IONICONS} />
    </View>
  );
};

export default NiAudio;
