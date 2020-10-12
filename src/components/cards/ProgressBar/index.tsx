import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StateType } from '../../../types/store/StoreType';
import Selectors from '../../../store/activities/selectors';
import styles from './styles';

interface ProgressBar {
  maxProgress: number,
  progress: number,
}

const ProgressBar = ({ maxProgress, progress }: ProgressBar) => {
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const style = styles(progressPercentage);

  useEffect(() => {
    setProgressPercentage((progress / maxProgress) * 100);
  }, [progress, maxProgress]);

  return (
    <>
      <View style={style.container}>
        <View style={style.content} />
      </View>
      <Text style={style.text}>{progress}/{maxProgress}</Text>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({
  maxProgress: Selectors.getMaxProgress(state),
  progress: Selectors.getProgress(state),
});

export default connect(mapStateToProps)(ProgressBar);
