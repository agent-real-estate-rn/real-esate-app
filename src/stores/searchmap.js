
const initialState = {
  loading: false,
  initialLocation: {},
  propertyList: [],
  filteredPropertiesList: [],
  snapshotUri: '',
  filterData: {},
  polygon: []
};

export default searchOnMap = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_MAP': {
      return {...state, initialLocation: action.initialRegion, propertyList: action.propertyList};
    };

    case 'FILTER_PROPERTIES_PENDING': {
      return {...state, loading: true, polygon: action.polygon}
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

    case 'GET_FILTER': {
      return {...state, filterData: action.propertiesFulfilled};
    };

    case 'FILTER_PROPERTIES_BY_CATEGORIES': {
      return {...state, filteredPropertiesList: action.properties, loading: false};
    }

    default: return state;
  }
}
