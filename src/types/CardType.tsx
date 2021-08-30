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

export type TransitionType = {
  _id: string,
  template: string,
  title: string,
}

export type TitleTextMediaType = {
  _id: string,
  template: string,
  title: string,
  media: {
    link: string,
    publicId: string,
    type: string,
  },
  text: string,
}

export type SingleChoiceQuestionType = {
  _id: string,
  template: string,
  question: string,
  qcuGoodAnswer: string,
  qcAnswers: answerFromAPIType[],
  explanation: string,
}

export type TextMediaType = {
  _id: string,
  template: string,
  media: {
    link: string,
    publicId: string,
    type: string,
  },
  text: string,
}

export type SurveyType = {
  _id: string,
  template: string,
  question: string,
  isMandatory: boolean,
  label?: { left: string, right: string},
}

export type TitleTextType = {
  _id: string,
  template: string,
  title: string,
  text: string,
}

export type qcmAnswerFromAPIType = {
  correct: boolean,
  text: string,
}

export type MultipleChoiceQuestionType = {
  _id: string,
  template: string,
  question: string,
  qcAnswers: qcmAnswerFromAPIType[],
  explanation: string,
}

export type FlashCardType = {
  _id: string,
  template: string,
  text: string,
  backText: string,
}
export type OpenQuestionType = {
  _id: string,
  template: string,
  question: string,
  isMandatory: boolean,
  answer?: string,
}

export type OrderedAnswerType = {
  text: string,
  _id: string,
}

export type OrderTheSequenceType = {
  _id: string,
  template: string,
  question: string,
  orderedAnswers: OrderedAnswerType[],
  explanation: string,
}

export type GapAnswerType = {
  text: string,
  _id: string,
}

export type FillTheGapType = {
  _id: string,
  template: string,
  gappedText: string,
  falsyGapAnswers: GapAnswerType[],
  explanation: string,
  canSwitchAnswers: boolean,
}

export type answerFromAPIType = {
  _id: string,
  text: string,
}

export type QuestionAnswerType = {
  _id: string,
  isQuestionAnswerMultipleChoiced: boolean,
  question: string,
  qcAnswers: answerFromAPIType[],
  isMandatory: boolean,
}

export type footerColorsType = {
  buttons: string,
  text: string,
  background: string,
}
