import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { StateType } from '../../../types/store/StoreType';
import { getIndexCard, getTotalCards } from '../../../store/activities/selectors';
import styles from './styles';

interface ProgressBar {
  totalCards: number,
  index: number,
}

const ProgressBar = ({ totalCards, index }: ProgressBar) => {
  const [progress, setProgress] = useState<number>(50);

  useEffect(() => {
    setProgress((index / totalCards) * 100);
  }, [index, totalCards]);

  return (
    <>
      <View style={styles(progress).container}>
        <View style={styles(progress).content} />
      </View>
      <Text style={styles(progress).text} >{index}/{totalCards}</Text>
    </>
  );
};

const mapStateToProps = (state: StateType) => ({ totalCards: getTotalCards(state), index: getIndexCard(state) });

export default connect(mapStateToProps)(ProgressBar);
