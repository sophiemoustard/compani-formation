import React from 'react';
import { View, Text, FlatList, StyleProp, ViewStyle, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './styles';
import { SubProgramType } from '../../types/SubProgramType';
import { CourseType } from '../../types/CourseType';
import { ProgramType } from '../../types/ProgramType';
import { formatWordToPlural } from '../../core/helpers/utils';
import NiButton from '../../components/form/Button';
import { PINK, WHITE } from '../../styles/colors';
import { navigate } from '../../navigationRef';

interface CoursesSectionProps {
  items: Array<ProgramType | CourseType | SubProgramType>,
  title: string,
  type?: string,
  countStyle: StyleProp<ViewStyle>
  showCatalogButton?: boolean,
  renderItem: (item) => JSX.Element,
}

const CoursesSection = ({
  items,
  title,
  type = 'FORMATION',
  countStyle,
  showCatalogButton = false,
  renderItem,
}: CoursesSectionProps) => {
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <Text style={[countStyle, styles.countContainer]}>
        {formatWordToPlural(items, type).toUpperCase()}
      </Text>
      <FlatList horizontal data={items} keyExtractor={item => item._id} style={styles.container}
        renderItem={({ item }) => renderItem(item)} showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={renderSeparator} />
      {showCatalogButton &&
      <TouchableOpacity style={styles.courseContainer}>
        <ImageBackground imageStyle={styles.goToCatalogBackground} style={styles.goToCatalog}
          source={require('../../../assets/images/go-to-catalog.png')}>
          <Text style={styles.text}>Tu n’as pas de formation en cours...</Text>
          <NiButton caption="Chercher une formation" onPress={() => navigate('Catalog')}
            bgColor={PINK[500]}
            color={WHITE} borderColor={PINK[500]} />
        </ImageBackground>
      </TouchableOpacity>
      }
    </>
  );
};

export default CoursesSection;
