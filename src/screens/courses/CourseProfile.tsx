import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleProp,
  ViewStyle,
  LogBox,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationType } from '../../types/NavigationType';
import Courses from '../../api/courses';
import { WHITE, GREY } from '../../styles/colors';
import { MAIN_MARGIN_LEFT, ICON, MARGIN } from '../../styles/metrics';
import OnSiteCell from '../../components/steps/OnSiteCell';
import ELearningCell from '../../components/steps/ELearningCell';
import { Context as AuthContext } from '../../context/AuthContext';
import { ON_SITE, E_LEARNING } from '../../core/data/constants';
import commonStyles from '../../styles/common';
import { FIRA_SANS_BLACK } from '../../styles/fonts';
import { CourseType } from '../../types/CourseType';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

interface CourseProfileProps {
  route: { params: { courseId: string } },
  navigation: NavigationType,
}

const CourseProfile = ({ route, navigation }: CourseProfileProps) => {
  const [course, setCourse] = useState<CourseType | null>(null);
  const { signOut } = useContext(AuthContext);

  const getCourse = async () => {
    try {
      const fetchedCourse = await Courses.getCourse(route.params.courseId);
      setCourse(fetchedCourse);
    } catch (e) {
      if (e.status === 401) signOut();
      setCourse(null);
    }
  };

  useEffect(() => {
    async function fetchData() { await getCourse(); }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchData() { await getCourse(); }
    if (isFocused) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const programImage = get(course, 'subProgram.program.image.link') || '';
  const programName = get(course, 'subProgram.program.name') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../assets/images/authentication_background_image.jpg');
  const goBack = () => navigation.navigate('Home', { screen: 'Courses', params: { screen: 'CourseList' } });

  const renderCells = ({ item, index }) => {
    if (item.type === ON_SITE) return <OnSiteCell step={item} slots={course?.slots} index={index} />;

    if (item.type === E_LEARNING) {
      return <ELearningCell step={item} index={index} navigation={navigation}
        courseId={route.params.courseId} />;
    }

    return null;
  };

  const renderSeparator = () => <View style={styles.separator} />;

  return course && (
    <ScrollView style={commonStyles.container} nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
      <ImageBackground source={source} imageStyle={styles.image}
        style={{ resizeMode: 'contain' } as StyleProp<ViewStyle>}>
        <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.4)']} style={styles.gradient} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.arrow} onPress={goBack}>
            <Feather name="arrow-left" color={WHITE} size={ICON.MD} />
          </TouchableOpacity>
          <Text style={styles.title}>{programName}</Text>
        </View>
      </ImageBackground>
      <FlatList style={styles.flatList} data={course.subProgram.steps} keyExtractor={item => item._id}
        renderItem={renderCells} ItemSeparatorComponent={renderSeparator} />
    </ScrollView>
  );
};

const imageHeight = 200;
const styles = StyleSheet.create({
  image: {
    height: imageHeight,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: imageHeight * 0.4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: imageHeight,
    position: 'absolute',
  },
  arrow: {
    margin: MAIN_MARGIN_LEFT,
  },
  title: {
    ...FIRA_SANS_BLACK.XL,
    color: WHITE,
    margin: MAIN_MARGIN_LEFT,
    textShadowColor: GREY[800],
    textShadowRadius: 4,
    textShadowOffset: { width: 0, height: 1 },
  },
  separator: {
    marginBottom: MARGIN.MD,
  },
  flatList: {
    marginVertical: MARGIN.MD,
  },
});

export default CourseProfile;
