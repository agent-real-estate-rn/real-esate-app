
const initialState = {
  loading: false,
  initialLocation: {},
  propertyList: [],
  filteredPropertiesList: [],
  snapshotUri: '',
  filterCategory: {},
  polygon: []
};

export default searchOnMap = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_MAP': {
      return {...state, initialLocation: action.initialRegion, propertyList: action.propertyList};
    };

    case 'FILTER_PROPERTIES_PENDING': {
      return {...state, loading: true}
    };

    case 'FILTER_PROPERTIES': {
      return {...state, loading: false, filteredPropertiesList: action.payload, polygon: action.polygon}
    };

    case 'RESET_PROPERTY_LIST': {
      return {...state, filteredPropertiesList: []};
    };

    case 'GET_SNAPSHOT': {
      return {...state, snapshotUri: action.uri};
    };

    case 'GET_FILTER': {
      return {...state, filterCategory: action.filter};
    };

    default: return state;
  }
}
