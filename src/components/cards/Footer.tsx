/* eslint-disable no-console */
import React from 'react';
import Button from '../form/Button';
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
    <>
      <Button disabled={disabled} caption="Next" onPress={() => navigate(`template${index + 1}`)} />
      <Button disabled={disabled} caption="Previous" onPress={() => navigate(`template${index - 1}`)} />
    </>
  );
}
export default Footer;
