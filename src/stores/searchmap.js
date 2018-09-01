
const initialState = {
  initialLocation: {
    latitude: 10.7777045,
    longitude: 106.6858056,
    latitudeDelta: Math.round(Math.log(360/10.7777045)/Math.LN2),
    longitudeDelta: Math.round(Math.log(360/106.6858056)/Math.LN2)
  },
  polygonArr: [],
  markerArr: []
};

export default searchOnMap = (state= initialState, action) => {
  switch (action.type) {
    case 'INITAL_MAP': {
      return {...state, initialLocation: action.coordinate};
    }
    default: return state;
  }
}
