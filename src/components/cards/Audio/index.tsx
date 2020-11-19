import React, { useEffect } from 'react';
import { Audio } from 'expo-av';
import { useIsFocused } from '@react-navigation/native';
import { ICON } from '../../../styles/metrics';
import IconButton from '../../../components/IconButton';
import { PINK } from '../../../styles/colors';

interface NiAudioProps {
  mediaSource: { uri: string } | undefined,
}

const NiAudio = ({ mediaSource }: NiAudioProps) => {
  const isFocused = useIsFocused();
  const soundObject = new Audio.Sound();

  useEffect(() => {
    async function loadAudio() {
      const status = await soundObject.getStatusAsync();
      if (mediaSource && !status.isLoaded) await soundObject.loadAsync(mediaSource);
    }

    async function unloadAudio() {
      const status = await soundObject.getStatusAsync();
      if (status.isLoaded) await soundObject.unloadAsync();
    }

    if (isFocused) loadAudio();
    else unloadAudio();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const playAudio = async () => {
    try {
      const status = await soundObject.getStatusAsync();
      if (mediaSource && status.isLoaded) await soundObject.playFromPositionAsync(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <IconButton name='play-circle' size={ICON.XXL} onPress={playAudio} color={PINK[500]}
      style={{ borderWhidth: 1, borderColor: 'red' }} />
  );
};

export default NiAudio;
