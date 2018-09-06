import firebase from '../firebase';
import data from '../listingArray.json'

export default function mapDispatchToSearchProps(dispatch) {
  return {
    getInitialData() {
      const initialRegion = {
        latitude: 10.7623717,
        longitude: 106.7061763,
        latitudeDelta: 0.04292,
        longitudeDelta: 0.03021
      }
      const coordinatesList = data.propertyList.map(item => {
        return {
          id: item.id,
          coordinates: item.coordinates
        }
      });
      dispatch({
        type: 'INITIAL_MAP',
        initialRegion,
        propertyList: coordinatesList
      });
    }
  }
}