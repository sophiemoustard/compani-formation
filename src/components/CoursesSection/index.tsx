import React from 'react';
import { View, Text, FlatList, StyleProp, ViewStyle } from 'react-native';
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
  countStyle: StyleProp<ViewStyle>
  renderItem: (item) => JSX.Element,
}

const CoursesSection = ({
  items,
  title,
  type = 'FORMATION',
  countStyle,
  renderItem,
}: CoursesSectionProps) => {
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <>
      <Text style={commonStyles.sectionTitleText}>{title}</Text>
      <Text style={[countStyle, styles.countContainer]}>
        {formatWordToPlural(items, type).toUpperCase()}
      </Text>
      <FlatList horizontal data={items} keyExtractor={item => item._id}
        renderItem={({ item }) => renderItem(item)} contentContainerStyle={styles.courseContainer}
        showsHorizontalScrollIndicator={false} ItemSeparatorComponent={renderSeparator} />
    </>
  );
};

export default CoursesSection;
