export interface CardType {
  _id: string,
  template: string,
  title?: string,
  media?: {
    link: string,
    publicId: string,
  },
  text?: string,
  question?: string,
  qcuGoodAnswer?: string,
  falsyAnswers?: Array<string>,
  explanation?: string,
  label?: { left: string, right: string},
}
