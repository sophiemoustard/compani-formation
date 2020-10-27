import React, { useContext } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { navigate } from '../../../navigationRef';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { NavigationType } from '../../../types/NavigationType';
import { ProgramType } from '../../../types/ProgramType';
import Button from '../../../components/form/Button';
import Courses from '../../../api/courses';
import { getLoggedUserId } from '../../../store/main/selectors';

interface AboutProps {
  route: { params: { program: ProgramType } },
  navigation: NavigationType,
  loggedUserId: string,
}

const About = ({ route, navigation, loggedUserId }: AboutProps) => {
  const { program } = route.params;
  const { signOut } = useContext(AuthContext);

  const programImage = get(program, 'image.link') || '';
  const programName = get(program, 'name') || '';
  const programDescription = get(program, 'description') || '';
  const source = programImage
    ? { uri: programImage }
    : require('../../../../assets/images/authentication_background_image.jpg');
  const subProgram = program.subPrograms ? program.subPrograms[0] : null;
  const course = subProgram && subProgram.courses ? subProgram.courses[0] : {};
  const hasAlreadySubscribed = course.trainees.map(t => t._id).includes(loggedUserId);

  const goBack = () => {
    navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });
  };

  const goToCourse = id => navigation.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId: id } } }
  );

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!hasAlreadySubscribed) await Courses.addELearningCourseTrainee(course._id);
      goToCourse(course._id);
    } catch (e) {
      if (e.status === 401) signOut();
    }
  };

  const buttonCaption = hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header} />
      <View style={styles.content}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" color={WHITE} size={ICON.MD} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.aboutTitle}>A PROPOS</Text>
          <Text style={styles.programTitle}>{programName}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={source} />
        </View>
        <View style={styles.description}>
          <Text>{programDescription}</Text>
        </View>
      </View>
      <Button style={styles.footer} caption={buttonCaption} onPress={subscribeAndGoToCourseProfile} />
    </ScrollView>
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

export default connect(mapStateToProps)(About);
