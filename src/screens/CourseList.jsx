import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import screensStyle from '../styles/screens.style';
import { MAIN_MARGIN_LEFT } from '../styles/variables.js';
import NextEvent from '../components/NextEvent';
import Blob from '../components/Blob';

const nextEvents = [
  { date: '2020-12-09T09:00:00', program: 'Identifier ses emotions pour mieux communiquer.', _id: '1' },
  { date: '2020-12-09T09:00:00', program: 'Identifier ses emotions pour mieux communiquer.', _id: '2' },
  { date: '2020-12-09T09:00:00', program: 'Identifier ses emotions pour mieux communiquer.', _id: '3' }
];

const CourseListScreen = () => {
  return (
    <View style={screensStyle.container}>
      <Text style={screensStyle.title}>Mes formations</Text>
      <View style={styles.blobContainer}>
        <Blob style={styles.blob} color="#FFEA95" />
      </View>
      <Text style={screensStyle.subtitle}>Prochains évènements</Text>
      <View>
        <FlatList
          horizontal
          data={nextEvents}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <NextEvent event={item} />}
          style={{...styles.nextEventContainer}}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nextEventContainer: {
    paddingLeft: MAIN_MARGIN_LEFT,
  },
  blobContainer: { position: 'relative' },
  blob: { position: 'absolute', top: -10 }
});

export default CourseListScreen;
