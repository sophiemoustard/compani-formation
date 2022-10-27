export type ImageType = {
  uri: string;
  name: string;
  type: string | null;
}

export type FormDataType = {
  append(key: string, value: ImageType | string): void;
}
