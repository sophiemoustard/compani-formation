import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import Courses from '../../api/courses';
import { WHITE, BLACK, MAIN_MARGIN_LEFT } from '../../styles/variables';
import OnSiteCell from '../../components/OnSiteCell';
import { ON_SITE } from '../../core/data/constants';

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

  const programImage = get(course, 'program.image.link') || '';
  const programName = get(course, 'program.name') || '';
  const source = programImage ? { uri: programImage } : require('../../../assets/authentication_background_image.jpg');
  const goBack = () => navigation.navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });

  return (
    course && <View>
      <ImageBackground source={source} imageStyle={styles.image} style={{ resizeMode: 'contain' }} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={goBack}>
          <MaterialIcons name="arrow-back" color={WHITE} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>{programName}</Text>
      </View>
      <FlatList
        data={course.program.steps}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => item.type === ON_SITE && <OnSiteCell step={item} slots={course.slots} />}
      />
    </View>
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
