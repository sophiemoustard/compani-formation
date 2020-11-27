import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  FlatList,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import styles from './styles';
import commonStyles from '../../styles/common';
import { SubProgramType } from '../../types/SubProgramType';
import { CourseType } from '../../types/CourseType';
import { ProgramType } from '../../types/ProgramType';
import { formatWordToPlural } from '../../core/helpers/utils';

interface CoursesSectionProps {
  items: Array<ProgramType | CourseType | SubProgramType>,
  title: string,
  type?: string,
  image?: ImageSourcePropType,
  backgroundStyle: StyleProp<ImageStyle>,
  courseCountStyle: StyleProp<ViewStyle>
  renderItem: (item) => JSX.Element,
}

const CoursesSection = ({
  items,
  title,
  type = 'FORMATION',
  image = 0,
  backgroundStyle,
  courseCountStyle,
  renderItem,
}: CoursesSectionProps) => {
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <ImageBackground imageStyle={image ? backgroundStyle : null} style={styles.sectionContainer} source={image}>
      <View style={image ? commonStyles.sectionContainer : [commonStyles.sectionContainer, backgroundStyle]}>
        <Text style={commonStyles.sectionTitleText}>{title}</Text>
        <Text style={[courseCountStyle, commonStyles.countContainer]}>{formatWordToPlural(items, type)}</Text>
        <FlatList horizontal data={items} keyExtractor={item => item._id}
          renderItem={({ item }) => renderItem(item)} contentContainerStyle={styles.courseContainer}
          showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
      </View>
    </ImageBackground>
  );
};

export default CoursesSection;
