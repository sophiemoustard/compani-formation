import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import get from 'lodash/get';
import { navigate } from '../../../navigationRef';
import Courses from '../../../api/courses';
import { Context as AuthContext } from '../../../context/AuthContext';
import styles from './styles';
import { WHITE } from '../../../styles/colors';
import { ICON } from '../../../styles/metrics';

interface AboutProps {
  route: { params: { courseId: string } },
}

const About = ({ route } : AboutProps) => {
  const [course, setCourse] = useState<any | null>(null);
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
    : require('../../../../assets/images/authentication_background_image.jpg');
  const goBack = () => {
    navigate('Home', { screen: 'Explore', params: { screen: 'Catalog', params: { courseId: route.params.courseId } } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={goBack}>
          <Feather name="arrow-left" color={WHITE} size={ICON.MD} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.subTitle}>{'A propos'.toUpperCase()}</Text>
          <Text style={styles.title}>{programName}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={source} />
      </View>
    </View>
  );
};

export default About;
