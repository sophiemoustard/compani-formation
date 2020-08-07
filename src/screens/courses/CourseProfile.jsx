import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, FlatList, YellowBox } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import Courses from '../../api/courses';
import { WHITE, BLACK } from '../../styles/colors';
import { MAIN_MARGIN_LEFT, ICON } from '../../styles/metrics';
import OnSiteCell from '../../components/OnSiteCell';
import ELearningCell from '../../components/ELearningCell';
import { ON_SITE, E_LEARNING } from '../../core/data/constants';
import commonStyles from '../../styles/common';

YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const CourseProfileScreen = ({ route, navigation }) => {
  const [course, setCourse] = useState(null);
  const getCourse = async () => {
    const course = await Courses.getCourse(route.params.courseId);
    setCourse(course);
  };

  useEffect(() => {
    async function fetchData () { await getCourse(); }
    fetchData();
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData () { await getCourse(); }
    if (isFocused) fetchData();
  }, [isFocused]);

  const programImage = get(course, 'program.image.link') || '';
  const programName = get(course, 'program.name') || '';
  const source = programImage ? { uri: programImage } : require('../../../assets/authentication_background_image.jpg');
  const goBack = () => navigation.navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });

  const renderCells = ({ item, index }) => {
    if (item.type === ON_SITE) {
      return <OnSiteCell step={item} slots={course.slots} index={index} />;
    }

    if (item.type === E_LEARNING) {
      return <ELearningCell step={item} index={index} />;
    }

    return null;
  };

  return (
    course && (
      <ScrollView style={commonStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
        <ImageBackground source={source} imageStyle={styles.image} style={{ resizeMode: 'contain' }} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrow} onPress={goBack}>
            <Feather name="arrow-left" color={WHITE} size={ICON.MD} />
          </TouchableOpacity>
          <Text style={styles.title}>{programName}</Text>
        </View>
        <FlatList data={course.program.steps} keyExtractor={(item) => item._id} renderItem={renderCells} />
      </ScrollView>
    )
  );
};

CourseProfileScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.exact({
      courseId: PropTypes.string.isRequired,
    })
  }),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const imageHeight = 200;
const styles = StyleSheet.create({
  image: {
    height: imageHeight,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: imageHeight,
  },
  arrow: {
    margin: MAIN_MARGIN_LEFT,
  },
  title: {
    color: WHITE,
    margin: MAIN_MARGIN_LEFT,
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: BLACK,
    textShadowRadius: 1
  }
});

export default CourseProfileScreen;
