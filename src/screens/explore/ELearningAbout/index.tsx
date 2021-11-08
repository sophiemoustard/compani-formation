import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { StackActions } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationType';
import { Context as AuthContext } from '../../../context/AuthContext';
import Courses from '../../../api/courses';
import { getLoggedUserId } from '../../../store/main/selectors';
import CoursesActions from '../../../store/courses/actions';
import { ActionWithoutPayloadType } from '../../../types/store/StoreType';
import About from '../../../components/About';

interface ElearningAboutProps extends StackScreenProps<RootStackParamList, 'ElearningAbout'> {
  loggedUserId: string,
  setIsCourse: (value: boolean) => void,
}

const ElearningAbout = ({ route, navigation, loggedUserId, setIsCourse }: ElearningAboutProps) => {
  const { signOut } = useContext(AuthContext);
  const { program } = route.params;
  const [hasAlreadySubscribed, setHasAlreadySubscribed] = useState(false);
  const [courseId, setCourseId] = useState<string>('');

  useEffect(() => {
    const subProgram = program.subPrograms ? program.subPrograms[0] : null;
    const course = subProgram?.courses ? subProgram.courses[0] : null;
    if (course) {
      setCourseId(course._id);
      setHasAlreadySubscribed(course?.trainees?.includes(loggedUserId) || false);
    }
  }, [loggedUserId, program]);

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  const startActivity = () => {
    const firstActivity = get(program, 'subPrograms[0].steps[0].activities[0]') || null;
    navigation.dispatch(StackActions.replace('CourseProfile', { courseId }));
    navigation.navigate('ActivityCardContainer', { activityId: firstActivity._id, profileId: courseId });
  };

  const subscribeAndGoToCourseProfile = async () => {
    try {
      setIsCourse(true);
      if (!hasAlreadySubscribed) {
        await Courses.registerToELearningCourse(courseId);
        startActivity();
      } else goToCourse();
    } catch (e: any) {
      if (e.response.status === 401) signOut();
    }
  };

  const buttonCaption = hasAlreadySubscribed ? 'Continuer' : 'Commencer';

  return (
    <About program={program} onPress={subscribeAndGoToCourseProfile} buttonCaption={buttonCaption} />
  );
};

const mapStateToProps = state => ({ loggedUserId: getLoggedUserId(state) });

const mapDispatchToProps = (dispatch: ({ type }: ActionWithoutPayloadType) => void) => ({
  setIsCourse: (isCourse: boolean) => dispatch(CoursesActions.setIsCourse(isCourse)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ElearningAbout);
