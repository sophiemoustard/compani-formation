import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import get from 'lodash/get';
import moment from '../../../core/helpers/moment';
import About from '../../../components/About';
import styles from './styles';
import { capitalize, formatIdentity } from '../../../core/helpers/utils';
import { markdownStyle } from '../../../styles/common';
import InternalRulesModal from '../../../components/InternalRulesModal';
import { ICON } from '../../../styles/metrics';
import { GREY } from '../../../styles/colors';

interface BlendedAboutProps {
  route: { params: { course, fromNotification?: boolean } },
  navigation: {
    goBack: () => {},
    navigate: (path: string, params: { courseId: string }) => {},
  },
}

const BlendedAbout = ({ route, navigation }: BlendedAboutProps) => {
  const { course } = route.params;
  const program = course.subProgram?.program || null;
  const [dates, setDates] = useState<Array<Date>>([]);
  const [formattedDates, setFormattedDates] = useState<Array<string>>([]);
  const [trainerPictureSource, setTrainerPictureSource] = useState(
    require('../../../../assets/images/default_avatar.png')
  );
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  useEffect(() => {
    setDates(course.slots.length
      ? course.slots.map(slot => slot.startDate).sort((a, b) => moment(a).diff(b, 'days'))
      : []);
  }, [course]);

  useEffect(() => {
    if (dates) {
      const dateFormat = 'DD/MM/YYY';
      const slotsDates = [...new Set(dates.map(date => moment(date).format(dateFormat)))];
      setFormattedDates(slotsDates.map((date) => {
        const dayOfWeek = capitalize(moment(date, dateFormat).format('ddd'));
        const dayOfMonth = capitalize(moment(date, dateFormat).format('D'));
        const month = capitalize(moment(date, dateFormat).format('MMM'));
        const year = capitalize(moment(date, dateFormat).format('YYYY'));
        return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
      }));
    }
    if (get(course, 'trainer.picture.link')) setTrainerPictureSource({ uri: course.trainer.picture.link });
  }, [dates, course]);

  const goBack = () => navigation.goBack();

  const goToCourse = () => {
    if (course._id) navigation.navigate('CourseProfile', { courseId: course._id });
  };

  const onPressButton = route.params?.fromNotification ? goToCourse : goBack;

  return program && (
    <About program={program} onPress={onPressButton}>
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
          <Text style={styles.sectionTitle}>Intervenant</Text>
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
