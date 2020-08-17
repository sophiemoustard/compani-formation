export interface routeType {
  params: {
    courseId: string,
  }
}

export interface navigationType {
    navigate: (path: string, option?: { screen: string, params: object }) => {},
}
