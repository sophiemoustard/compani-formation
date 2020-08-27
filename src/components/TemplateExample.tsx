import React from 'react';
import { Text } from 'react-native';

interface TemplateExampleProps {
  template: String,
}

const TemplateExample = ({ template }: TemplateExampleProps) => (
  <Text>{template}</Text>
);

export default TemplateExample;
