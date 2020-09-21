export type CardType =
SingleChoiceQuestionType |
TransitionType |
TitleTextMediaType |
TextMediaType |
SurveyType |
TitleTextType |
MultipleChoiceQuestionType;

export interface TransitionType {
  _id: string,
  template: string,
  title: string,
}

export interface TitleTextMediaType {
  _id: string,
  template: string,
  title: string,
  media: {
    link: string,
    publicId: string,
  },
  text: string,
}

export interface SingleChoiceQuestionType {
  _id: string,
  template: string,
  question: string,
  qcuGoodAnswer: string,
  qcuFalsyAnswers: Array<string>,
  explanation: string,
}

export interface TextMediaType {
  _id: string,
  template: string,
  media: {
    link: string,
    publicId: string,
  },
  text: string,
}

export interface SurveyType {
  _id: string,
  template: string,
  question: string,
  label?: { left: string, right: string},
}

export interface TitleTextType {
  _id: string,
  template: string,
  title: string,
  text: string,
}

export interface qcmAnswerFromAPIType {
  correct: boolean,
  label: string,
}

export interface MultipleChoiceQuestionType {
  _id: string,
  template: string,
  question: string,
  qcmAnswers: Array<qcmAnswerFromAPIType>,
  explanation: string,
}
export interface FlashType {
  _id: string,
  template: string,
  text: string,
  backText: string,
}
