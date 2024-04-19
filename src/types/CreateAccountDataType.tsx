export type CreateAccountDataType = {
  type: string,
  field: string,
  title: string,
  caption: string,
  value: string,
  isValid: boolean,
  errorMessage: string,
  isValidationAttempted: boolean,
  required: boolean,
  openUrl?: { text: string, link: string },
}
