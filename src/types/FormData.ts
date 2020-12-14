export {};

declare global {
  interface FormDataValue {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(key: string, value: FormDataValue | string): void;
  }
}
