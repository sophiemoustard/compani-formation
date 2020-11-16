export interface NavigationType {
  navigate: (path: string, option?: { screen: string, params: object }) => {},
  dangerouslyGetParent: () => {setOptions({ tabBarVisible })},
}
