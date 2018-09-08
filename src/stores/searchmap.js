
const initialState = {
  loading: false,
  initialLocation: {},
  propertyList: [],
  filteredPropertiesList: [],
  snapshotUri: ''
};

export default searchOnMap = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_MAP': {
      return {...state, initialLocation: action.initialRegion, propertyList: action.propertyList};
    };
    case 'FILTER_PROPERTIES_PENDING': {
      return {...state, loading: true}
    };
    case 'FILTER_PROPERTIES_FULFILLED': {
      return {...state, loading: false, filteredPropertiesList: action.payload}
    };
    case 'RESET_PROPERTY_LIST': {
      return {...state, filteredPropertiesList: []};
    };
    case 'GET_SNAPSHOT': {
      return {...state, snapshotUri: action.uri};
    };
    default: return state;
  }
}
