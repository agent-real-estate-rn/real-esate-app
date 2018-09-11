
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

    // case 'FILTER_PROPERTIES': {
    //   return {...state, loading: true, polygon: action.polygon}
    // };

    case 'FILTER_PROPERTIES_PENDING': {
      return {...state, polygon: action.polygon}
    };

    case 'FILTER_PROPERTIES_FULFILLED': {
      console.log(action);
      return {...state, filteredPropertiesList: action.listWithFilter }
    }

    case 'RESET_PROPERTY_LIST': {
      return {...state, filteredPropertiesList: [], polygon: []};
    };

    case 'GET_SNAPSHOT': {
      return {...state, snapshotUri: action.uri};
    };

    case 'GET_FILTER': {
      return {...state, filterData: action.propertiesFulfilled};
    };


    default: return state;
  }
}
