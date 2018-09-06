import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../style/searchscreen';
import { connect } from "react-redux";
import MapView from 'react-native-maps';
import geolib from 'geolib';
import _ from 'lodash';
import { Icon } from 'react-native-elements';
import mapDispatchToSearchProps from '../actions/search';
import Loading from '../Components/Loading';


class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      location: {
        latitude: 10.7623717,
        longitude: 106.7061763,
        latitudeDelta: 0.04292,
        longitudeDelta: 0.03021
      },
      markers: [],
      panDrag: [],
      polygon: [],
      marginBottom: 0
    };
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.toggleDrawOnMap = this.toggleDrawOnMap.bind(this);
    this.filterMarker = this.filterMarker.bind(this);
    this.map;
    this.drawPolygon = _.throttle(this.drawPolygon, 140);
  }

  getCurrentLocation() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04292,
            longitudeDelta: 0.03021
          };
          this.setRegion(region);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch(e) {
      console.log(e.message || "");
    }
  }

  setRegion(region) {
    this.map.animateToRegion(region);
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
        <MapView
          style = {{flex: 1, marginBottom: 0}}
          initialRegion={this.state.location}
          showsUserLocation = {true}
          showsMyLocationButton = {true}
          scrollEnabled = {!this.state.isDrawing}
          onPanDrag = {e => this.panDragMap(e)}
          ref={(map) => this.map = map}
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
          activeOpacity={0.8}
          style = {[styles.absoluteBtn, styles.drawButton]}
          onPress = {this.toggleDrawOnMap}
        >
          <Icon name ={!this.state.isDrawing ? 'brush' : 'highlight-off'} type = 'material_community' containerStyle = {styles.icon}/>
        </TouchableOpacity>
        {
          this.state.isDrawing && this.state.panDrag.length > 3 &&
          <TouchableOpacity
            activeOpacity={0.8}
            style = {[styles.absoluteBtn, styles.doneBtn]}
            onPress = {this.getCurrentLocation}
          ><Icon name ='done-all' type = 'material_community' containerStyle = {styles.icon}/>
          </TouchableOpacity>
        }
        {
          this.state.polygon.length > 3 && this.state.isDrawing &&
          <TouchableOpacity
            activeOpacity={0.8}
            style = {[styles.absoluteBtn, styles.getListBtn]}
            onPress = {this.getCurrentLocation}
          ><Text>Get properties list!</Text>
          </TouchableOpacity>
        }
        {this.state.loading && <Loading/>}
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
//TODO
/*
  Fetch data to store, integrate data from store to map
  try a fake one first
  inetgrate listing and detail screen
 */