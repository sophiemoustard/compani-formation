import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { StateType } from '../../types/store/StoreType';
import { FIRA_SANS_BOLD } from '../../styles/fonts';
import { GREY, YELLOW } from '../../styles/colors';
import { BORDER_RADIUS, BORDER_WIDTH, MARGIN } from '../../styles/metrics';
import { getProgress, getCardsCount } from '../../store/activities/selectors';

interface ProgressBar {
  totalCards: number,
  index: number,
}

const ProgressBar = ({ totalCards, index }: ProgressBar) => {
  const [progress, setProgress] = useState<number>(0);
  const style = styles(progress);

  useEffect(() => {
    setProgress((index / totalCards) * 100);
  }, [index, totalCards]);

  return (
    <>
      <View style={style.container}>
        <View style={style.content} />
      </View>
      <Text style={style.text} >{index}/{totalCards}</Text>
    </>
  );
};

const styles = (progress: number) => StyleSheet.create({
  container: {
    marginHorizontal: MARGIN.MD,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: GREY[200],
    borderRadius: BORDER_RADIUS.SM,
    height: 6,
    flex: 1,
    justifyContent: 'flex-start',
  },
  content: {
    display: 'flex',
    backgroundColor: YELLOW[500],
    borderRadius: BORDER_RADIUS.XL,
    width: `${progress}%`,
    height: '100%',
    borderRightWidth: BORDER_WIDTH,
    borderColor: GREY[100],
  },
  text: {
    ...FIRA_SANS_BOLD.SM,
    color: GREY[600],
  },
});

const mapStateToProps = (state: StateType) => ({ totalCards: getCardsCount(state), index: getProgress(state) });

export default connect(mapStateToProps)(ProgressBar);
