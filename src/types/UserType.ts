export interface UserType {
  _id: string,
  identity: { firstname: string, lastname: string },
  local: { email: string },
}
