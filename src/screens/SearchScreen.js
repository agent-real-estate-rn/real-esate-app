import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from "react-redux";
import MapView from 'react-native-maps';
import geolib from 'geolib';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import mapDispatchToSearchProps from '../actions/search';
import DropdownMenu from '../Components/DropdownMenu';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      markers: [],
      panDrag: [],
      polygon: [],
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.toggleDrawOnMap = this.toggleDrawOnMap.bind(this);
    this.filterMarker = this.filterMarker.bind(this);

    this.drawPolygon = _.throttle(this.drawPolygon, 100);
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        statusBarHeight: 1
      });
    }, 500);
  }

  componentDidMount() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(({coords}) => {
      const myLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
      let markMyPlace = {
        coordinate: myLocation
      };
      this.setState({
        location: myLocation,
        markers: [markMyPlace]
      });
    });
  }

  toggleDrawOnMap() {
    this.setState({
      isDrawing: !this.state.isDrawing,
      panDrag: [],
      polygon: []
    });
  }

  filterMarker() {
    let getMarker = this.state.markers.filter(marker => {
      if (geolib.isPointInside(marker.coordinate, this.state.panDrag)) {
        return marker;
      }
    });
    let list = this.state.panDrag.concat(this.state.panDrag[0]);
    this.setState({
      markers: getMarker,
      polygon: list,
      panDrag: [],
      isDrawing: !this.state.isDrawing
    });
  }

  panDragMap(e) {
    if (this.state.isDrawing) {
      this.drawPolygon(e.nativeEvent.coordinate);
    }
  }

  drawPolygon(coordinate) {
    let newArray = [...this.state.panDrag, { ...coordinate
    }];
    this.setState({
      panDrag: newArray
    });
  }

  render() {
    return (
      <View style = {styles.wrapScreen}>
        <MapView style = {{flex: 1}}
          initialRegion = {this.state.location}
          showsUserLocation = {true}
          showsMyLocationButton = {true}
          scrollEnabled = {!this.state.isDrawing}
          onPanDrag = {e => this.panDragMap(e)}
        >
          {this.state.markers.map((marker, key) => (
              <MapView.Marker key = {key}
                coordinate = {marker.coordinate}
              >
              </MapView.Marker>
          ))}
          {(this.state.panDrag.length > 0) &&
            (<MapView.Polyline coordinates = {this.state.panDrag}
              fillColor = 'rgba(25, 25, 112, 0.6)'
              strokeWidth = {2}
              miterLimit = {30}/>)
          }
          </MapView>
        <TouchableOpacity
          style = {styles.drawButton}
          onPress = {this.toggleDrawOnMap}
        >
          <Icon name = 'brush' type = 'material_community' containerStyle = {styles.drawIcon}/>
        </TouchableOpacity>
        <DropdownMenu style={{
          position: 'absolute',
          left: 10,
          top: 20,
          width: 360, backgroundColor: '#fff'}}
          textStyle={{padding: 20}}/>
      </View>
      )
    }
  }

  const mapStateToProps = function (state) {
    return { ...state.searchOnMap
    };
  };

  export default connect(
    mapStateToProps,
    mapDispatchToSearchProps
  )(SearchScreen);

  const styles = StyleSheet.create({
    wrapScreen: {
      flex: 1,
      position: 'relative',
      marginTop: 1
    },
    drawButton: {
      position: 'absolute',
      right: 10,
      top: 20,
      width: 60,
      height: 60,
      borderRadius: 30,
      zIndex: 3,
      backgroundColor: '#f8f8f8',
      shadowColor: 'rgba(0,0,0,.15)',
      shadowOffset: {
        width: 1,
        height: 2
      },
      shadowOpacity: 0.8,
      shadowRadius: 2
    },
    drawIcon: {
      paddingLeft: 3,
      paddingTop: 18
    }
  })