import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArrowButton from '../ArrowButton';
import { navigate } from '../../navigationRef';
import { CARD_TEMPLATES, QUIZ } from '../../core/data/constants';

interface FooterProps {
  index: number,
  template: string,
}

const Footer = ({ index, template }: FooterProps) => {
  let disabled = false;
  const cardTemplate = CARD_TEMPLATES.find(card => card.value === template);

  if (cardTemplate && cardTemplate.type === QUIZ) disabled = true;

  return (
    <View style={styles.container}>
      <ArrowButton direction='left' disabled={disabled} onPress={() => navigate(`template${index - 1}`)} />
      <ArrowButton direction='right' disabled={disabled} onPress={() => navigate(`template${index + 1}`)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Footer;
