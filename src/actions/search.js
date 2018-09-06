import firebase from '../firebase';
import data from '../listingArray.json'
import geolib from 'geolib';

export default function mapDispatchToSearchProps(dispatch, ownprops) {
  return {
    getInitialData: () => {
      
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
    },
    getFilteredPropertiesList: (propertyList, polygonArr) => {
      const payload = new Promise((resolve) => {
        const listProperties = propertyList.filter(item => {
          if (geolib.isPointInside(item.coordinates, polygonArr)) {
            return item;
          }
        });
        resolve(listProperties);
      });
      dispatch({
        type: 'FILTER_PROPERTIES',
        payload
      });
    },
    resetPropertyList: () => {
      dispatch({
        type: 'RESET_PROPERTY_LIST'
      });
    }
  }
}