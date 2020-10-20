// COURSES
export const STRICTLY_E_LEARNING = 'strictly_e_learning';

// STEPS
export const ON_SITE = 'on_site';
export const E_LEARNING = 'e_learning';
export const stepTypeOptions = {
  [ON_SITE]: 'Présentiel',
  [E_LEARNING]: 'eLearning',
};

// ICON FAMILY
export const FEATHER = 'Feather';

// ARROWS DIRECTION
export const LEFT = 'left';
export const RIGHT = 'right';

// ACTIVITIES
export const LESSON = 'lesson';
export const QUIZ = 'quiz';
export const SHARING_EXPERIENCE = 'sharing_experience';
export const VIDEO = 'video';
export const QUESTIONNAIRE = 'questionnaire';

export const TRANSITION = 'transition';
export const TITLE_TEXT_MEDIA = 'title_text_media';
export const TITLE_TEXT = 'title_text';
export const TEXT_MEDIA = 'text_media';
export const FLASHCARD = 'flashcard';
export const FILL_THE_GAPS = 'fill_the_gaps';
export const MULTIPLE_CHOICE_QUESTION = 'multiple_choice_question';
export const SINGLE_CHOICE_QUESTION = 'single_choice_question';
export const ORDER_THE_SEQUENCE = 'order_the_sequence';
export const OPEN_QUESTION = 'open_question';
export const SURVEY = 'survey';
export const QUESTION_ANSWER = 'question_answer';

export const CARD_TEMPLATES = [
  { label: 'Transition', value: TRANSITION, type: LESSON },
  { label: 'Titre Texte Média', value: TITLE_TEXT_MEDIA, type: LESSON },
  { label: 'Titre Texte', value: TITLE_TEXT, type: LESSON },
  { label: 'Texte Média', value: TEXT_MEDIA, type: LESSON },
  { label: 'Flashcard', value: FLASHCARD, type: LESSON },
  { label: 'Texte à trou', value: FILL_THE_GAPS, type: QUIZ },
  { label: 'QCM', value: MULTIPLE_CHOICE_QUESTION, type: QUIZ },
  { label: 'QCU', value: SINGLE_CHOICE_QUESTION, type: QUIZ },
  { label: 'Mettre dans l\'ordre', value: ORDER_THE_SEQUENCE, type: QUIZ },
  { label: 'Question ouverte', value: OPEN_QUESTION, type: QUESTIONNAIRE },
  { label: 'Sondage', value: SURVEY, type: QUESTIONNAIRE },
  { label: 'Question\t&\tRéponse', value: QUESTION_ANSWER, type: QUESTIONNAIRE },
];
