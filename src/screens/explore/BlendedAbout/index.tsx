import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import get from 'lodash/get';
import companiDate from '../../../core/helpers/dates';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity } from '../../../core/helpers/utils';
import { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';
import { BlendedCourseType } from '../../../types/CourseTypes';

interface BlendedAboutProps {
  route: { params: { course: BlendedCourseType } },
  navigation: {
    goBack: () => {},
    navigate: (path: string, params: { courseId: string }) => {},
  },
}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const program = course.subProgram?.program || null;
  const [dates, setDates] = useState<Date[]>([]);
  const [formattedDates, setFormattedDates] = useState<string[]>([]);
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  useEffect(() => {
    setDates(course.slots.length
      ? course.slots.map(slot => slot.startDate).sort((a, b) => companiDate(a).diff(b, 'days'))
      : []);
  }, [course]);

  useEffect(() => {
    if (dates) {
      const dateFormat = 'dd/LL/yyyy';
      const datesFirstSlots = dates.reduce((newDatesSlots: Date[], date) => {
        if (!newDatesSlots
          .some(slotDate => companiDate(slotDate).format(dateFormat) === companiDate(date).format(dateFormat))) {
          newDatesSlots.push(date);
        }
        return newDatesSlots;
      }, []);

      setFormattedDates(datesFirstSlots.map((date) => {
        const dayOfWeek = capitalize(companiDate(date).format('ccc'));
        const dayOfMonth = capitalize(companiDate(date).format('d'));
        const month = capitalize(companiDate(date).format('LLL'));
        const year = capitalize(companiDate(date).format('yyyy'));
        return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
      }));
    }
    if (get(course, 'trainer.picture.link')) setTrainerPictureSource({ uri: course.trainer.picture.link });
  }, [dates, course]);

  const goToCourse = () => {
    if (course._id) navigation.navigate('CourseProfile', { courseId: course._id });
  };

  return program && (
    <About program={program} onPress={goToCourse}>
      <View style={styles.content}>
        {course.slots.length > 0 &&
          <>
            <View style={styles.sectionDelimiter} />
            <Text style={styles.sectionTitle}>Dates de formation</Text>
            <FlatList data={formattedDates} keyExtractor={(item, idx) => `${item}${idx}`}
              renderItem={({ item }) =>
                <Markdown style={markdownStyle(styles.sectionContent)}>{`- ${item}`}</Markdown>} />
          </>}
        {!!course.trainer && <>
          <View style={styles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Intervenant(e)</Text>
          <View style={styles.subSectionContainer}>
            <Image style={styles.trainerPicture} source={trainerPictureSource} />
            <Text style={styles.subSectionTitle}>{formatIdentity(course.trainer.identity, 'FL')}</Text>
          </View>
          {!!course.trainer.biography && <Text style={styles.sectionContent}>{course.trainer.biography}</Text>}
        </>}
        {!!course.contact?.name && <>
          <View style={styles.sectionDelimiter} />
          <Text style={styles.sectionTitle}>Votre contact pour la formation</Text>
          <Text style={styles.subSectionTitle}>{course.contact.name}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${course.contact.phone}`)} style={styles.contact}>
            <Feather name='phone' size={ICON.MD} color={GREY[600]} />
            <Text style={styles.contactContent}>{course.contact.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${course.contact.email}`)} style={styles.contact}>
            <Feather name='mail' size={ICON.MD} color={GREY[600]}/>
            <Text style={styles.contactContent}>{course.contact.email}</Text>
          </TouchableOpacity>
        </>}
      </View>
      <TouchableOpacity style={styles.internalRulesContainer} onPress={() => setIsModalOpened(true)}>
        <Text style={styles.internalRules}>RÈGLEMENT INTÉRIEUR</Text>
      </TouchableOpacity>
      <InternalRulesModal visible={isModalOpened} onRequestClose={() => setIsModalOpened(false)} />
    </About>
  );
};

export default BlendedAbout;
