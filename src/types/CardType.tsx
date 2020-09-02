export interface CardType {
  _id: string,
  template: string,
  title?: string,
  media?: {
    link: string,
    publicId: string,
  },
  text?: string,
}
