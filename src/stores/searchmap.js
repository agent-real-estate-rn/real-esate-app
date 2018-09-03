
const initialState = {
  initialLocation: {
    latitude: 10.7777045,
    longitude: 106.6858056,
    latitudeDelta:  0.0922,
    longitudeDelta: 0.0421
  },
  polygonArr: [],
  markerArr: []
};

export default searchOnMap = (state= {}, action) => {
  switch (action.type) {
    case 'INITAL_MAP': {
      return {...state, initialLocation: action.coordinate};
    }
    default: return state;
  }
}
