import firebase from '../firebase';

export default function mapDispatchToSearchProps(dispatch) {
  return {
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const myLocation = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
        let coordinate = {coordinate: myLocation};
        dispatch({
          type: 'INITAL_MAP',
          ...coordinate
        });
      });
    }
  }
}