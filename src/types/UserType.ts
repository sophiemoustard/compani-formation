export interface UserType {
  _id: string,
  identity: { firstname: string, lastname: string },
  local: { email: string },
  picture?: { link: string },
  company?: { name: string },
  contact?: { phone: string },
  companyLinkRequest?: { company: { _id: string, name: string } }
  firstMobileConnection?: string,
}
