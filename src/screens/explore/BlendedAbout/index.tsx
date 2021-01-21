import React from 'react';
import About from '../../../components/About';

interface BlendedAboutProps {
  route: { params: { course } },
  navigation: {
    goBack: () => {},
  },
}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const { program } = course.subProgram ? course.subProgram : null;

  const goBack = () => navigation.goBack();

  return (
    <About program={program} onPress={goBack} />
  );
};

export default BlendedAbout;
