
const initialState = {
  initialLocation: {},
  propertyList: []
};

export default searchOnMap = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_MAP': {
      return {initialLocation: action.initialRegion, propertyList: action.propertyList};
    };
    default: return state;
  }
}
