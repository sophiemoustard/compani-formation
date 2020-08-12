export interface CourseSlotType {
  _id: string,
  startDate: string,
  endDate: string,
  courseId: string,
  address: AddressType,
  step: string,
}

export interface AddressType {
  fullAddress: string,
  street: string,
  city: string,
  zipCode: string,
  location: {
      coordinates: Array<number>,
      type: string,
  }
}
