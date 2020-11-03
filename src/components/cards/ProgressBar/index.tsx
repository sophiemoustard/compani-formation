import React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface ProgressBar {
  progress: number,
}

const ProgressBar = ({ progress }: ProgressBar) => {
  const style = styles(progress);

  return (
    <>
      <View style={style.container}>
        <View style={style.content} />
      </View>
    </>
  );
};

export default ProgressBar;
