import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import About from '../../About';

interface BlendedAboutProps {
  route: { params: { course } },
  navigation: {
    navigate: (path: string, params?: object) => {},
  },
}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const { program } = course.subProgram;

  const courseId = course._id;

  const hardwareBackPress = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', hardwareBackPress);

    return () => { BackHandler.removeEventListener('hardwareBackPress', hardwareBackPress); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goBack = () => navigation.navigate('Home', { screen: 'Explore', params: { screen: 'Catalog' } });

  const goToCourse = () => navigation.navigate('CourseProfile', { courseId });

  return (
    <About program={program} onPress={goToCourse} />
  );
};

export default BlendedAbout;
