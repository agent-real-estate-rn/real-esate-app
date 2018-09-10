import firebase from '../firebase';
import geolib from 'geolib';

export default function mapDispatchToSearchProps(dispatch, ownprops) {
  return {
    getInitialData: () => {
      let propertyList ={};
      const initialRegion = {
        latitude: 10.7623717,
        longitude: 106.7061763,
        latitudeDelta: 0.04292,
        longitudeDelta: 0.03021
      }
      firebase.database().ref('propertyList').once('value').then((snapshot) => {
        propertyList = snapshot.val();
        dispatch({
          type: 'INITIAL_MAP',
          initialRegion,
          propertyList: propertyList
        });
      });
    },

    getFilteredPropertiesList: (propertyList, polygonArr, filter) => {
      // const payload = new Promise((resolve) => {
      //   let listProperties = propertyList.filter(item => {
      //     if (geolib.isPointInside(item.coordinates, polygonArr)) {
      //       return item;
      //     }
      //   });

      //   if (filter && Object.keys(filter).length > 0) {
      //     listProperties = filterProperties(filter, listProperties);
      //   }

      //   resolve(listProperties);
        
      // });
      let listWithFilter;
      if (polygonArr.length > 0) {
        filterByPolygon(propertyList, polygonArr).then(data => {
          if (filter && Object.keys(filter).length > 0) {
            listWithFilter = filterProperties(filter, data);
          } else {
            listWithFilter = data;
          }
        });
        dispatch({
          type: 'FILTER_PROPERTIES',
          polygon: polygonArr,
          propertiesFulfilled: listWithFilter
        });
      }
    },

    resetPropertyList: () => {
      dispatch({
        type: 'RESET_PROPERTY_LIST'
      });
    },

    getSnapshot: (uri) => {
      dispatch({
        type: 'GET_SNAPSHOT',
        uri
      });
    },

    updateFilter(filter) {
      dispatch({
        type: 'GET_FILTER',
        filter
      });
    },

    filter

  }
}

const uploadImageAsync = async (uuid, uri) => {
  const ref = firebase.storage().ref().child(uuid);
  const response = await fetch(uri);
  const blob = await response.blob();

  const snapshot = await ref.put(blob);
  return snapshot.downloadURL;
  
};
const saveSubscription = (uuid, info) => {
  const ref = firebase.database().ref('subscription/').child(uuid);

}


const filterProperties = (filterObj, propertyList) => {
  const {bath, beds, cleaning, priceRange, security, size} = filterObj;
  let filteredProperties = propertyList.filter((item) => {
    if (bath > 0 && item.description.bath < bath) {
      return false;
    }
    if (beds  > 0 && item.description.bdrm < beds) {
      return false;
    }
    if (cleaning && !item.description.cleaning) {
      return false;
    }
    if (priceRange && !(priceRange[0] <= item.description.price <= priceRange[1])) {
      return false;
    }
    if (security && !item.description.security) {
      return false;
    }
    if (size && !(size[0] <= item.description.size <= size[1])) {
      return false;
    }

    return true;
  });
  return filteredProperties;
}

const filterByPolygon = (propertyList, polygonArr) => {
  const payload = new Promise((resolve) => {
    let listProperties = propertyList.filter(item => {
      if (geolib.isPointInside(item.coordinates, polygonArr)) {
        return item;
      }
    });
    resolve(listProperties);
  });
  return payload;
}