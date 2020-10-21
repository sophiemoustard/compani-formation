export type CardType =
SingleChoiceQuestionType |
TransitionType |
TitleTextMediaType |
TextMediaType |
SurveyType |
TitleTextType |
MultipleChoiceQuestionType |
FlashCardType |
OpenQuestionType |
OrderTheSequenceType;

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

export interface FlashCardType {
  _id: string,
  template: string,
  text: string,
  backText: string,
}
export interface OpenQuestionType {
  _id: string,
  template: string,
  question: string,
  answer?: string,
}

export interface OrderedAnswerType {
  label: string,
}

export interface OrderTheSequenceType {
  _id: string,
  template: string,
  question: string,
  orderedAnswers: Array<OrderedAnswerType>,
  explanation: string,
}

export interface FillTheGapType {
  _id: string,
  template: string,
  gappedText: string,
  falsyGapAnswers: Array<string>,
  explanation: string,
}

export interface answerType {
  _id: string,
  text: string,
}

export interface QuestionAnswerType {
  _id: string,
  isQuestionAnswerMultipleChoiced: boolean,
  question: string,
  questionAnswers: Array<answerType>,
}
