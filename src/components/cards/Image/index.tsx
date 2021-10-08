import React, { useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import cardsStyle from '../../../styles/cards';
import styles from './styles';
import { GREY } from '../../../styles/colors';
import commonStyle from '../../../styles/common';

interface NiImageProps {
  source: { uri: string },
  imgHeight: number,
  onPress: () => void,
}

const NiImage = ({ source, imgHeight, onPress }: NiImageProps) => {
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  const style = styles(imgHeight, isMediaLoading);

  return (
    <>
      {isMediaLoading && <View style={commonStyle.spinner}>
        <ActivityIndicator style={commonStyle.disabled} color={GREY[800]} size="small" />
      </View>}
      <TouchableOpacity onPress={onPress}>
        <Image source={source} style={[cardsStyle.media, style.media]}
          onLoadStart={() => setIsMediaLoading(true)} onLoadEnd={() => setIsMediaLoading(false)} />
      </TouchableOpacity>
    </>
  );
};

export default NiImage;
