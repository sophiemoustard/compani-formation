import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ScrollView, ImageSourcePropType } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { navigate } from '../../../navigationRef';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';
import { NavigationType } from '../../../types/NavigationType';
import { CourseType } from '../../../types/CourseType';
import Button from '../../../components/form/Button';
import Courses from '../../../api/courses';
import Programs from '../../../api/programs';
import { getLoggedUserId } from '../../../store/main/selectors';

interface AboutProps {
  route: { params: { programId: string } },
  navigation: { navigate: (path: string, activityId: any) => {} },
  loggedUserId: string,
}

const About = ({ route, navigation, loggedUserId }: AboutProps) => {
  const defaultImg = require('../../../../assets/images/authentication_background_image.jpg');
  const { programId } = route.params;
  const { signOut } = useContext(AuthContext);
  const [source, setSource] = useState<ImageSourcePropType>(defaultImg);
  const [programName, setProgramName] = useState<string>('');
  const [programDescription, setProgramDescription] = useState<string>('');
  const [courseId, setCourseId] = useState<string>('');
  const [firstActivityId, setFirstActivityId] = useState<string>('');
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState<Boolean>(false);

  const getProgram = async () => {
    try {
      const fetchedProgram = await Programs.getProgramForUser(programId);
      const programImage = get(fetchedProgram, 'image.link') || '';
      setProgramName(fetchedProgram.name || '');
      setProgramDescription(fetchedProgram.description || '');

      if (programImage) setSource({ uri: programImage });

      const subProgram = fetchedProgram.subPrograms ? fetchedProgram.subPrograms[0] : null;
      if (subProgram.steps.length && subProgram.steps[0].activities?.length) {
        setFirstActivityId(subProgram.steps[0].activities[0]);
      }
      const fetchedCourse = subProgram && subProgram.courses ? subProgram.courses[0] : {};

      setCourseId(fetchedCourse._id);
      setHasAlreadySubscribed(fetchedCourse.trainees.includes(loggedUserId));
    } catch (e) {
      if (e.status === 401) signOut();
      console.error(e);
      setProgramName('');
      setProgramDescription('');
      setSource(defaultImg);
      setCourseId('');
      setFirstActivityId('');
      setHasAlreadySubscribed(false);
    }
  };

  useEffect(() => {
    async function fetchData() { getProgram(); }
    if (loggedUserId) fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUserId]);

  const goBack = () => {
    navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });
  };

  const goToCourse = () => navigation.navigate(
    'Home',
    { screen: 'Courses', params: { screen: 'CourseProfile', params: { courseId } } }
  );

  const goToFirstActivityId = () => navigation.navigate('CardContainer', { activityId: firstActivityId, courseId });

  const subscribeAndGoToCourseProfile = async () => {
    try {
      if (!hasAlreadySubscribed) {
        await Courses.registerToELearningCourse(courseId);
        await getProgram();
        goToFirstActivityId();
      } else goToCourse();
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
