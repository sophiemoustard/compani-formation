export {};

declare global {
  interface FormDataValueProps {
    uri: string;
    name: string;
    type: string;
  }

  interface FormData {
    append(key: string, value: FormDataValueProps | string): void;
  }
}
