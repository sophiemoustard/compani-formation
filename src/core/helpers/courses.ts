import { EXPECTATIONS, END_OF_COURSE, SELF_POSITIONNING } from '../data/constants';

export const getQuestionnaireTitle = (questionnaireTypes: string[]) => {
  const labels = questionnaireTypes.map((type) => {
    switch (type) {
      case EXPECTATIONS:
        return 'de recueil des attentes';
      case END_OF_COURSE:
        return 'de fin de formation';
      case SELF_POSITIONNING:
        return 'd\'auto-positionnement';
      default:
        return '';
    }
  });

  return `questionnaire ${labels.join(' et ')}`;
};
