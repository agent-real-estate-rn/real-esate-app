import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../style/searchscreen";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import _ from "lodash";
import Expo from 'expo';
import { Icon } from "react-native-elements";
import mapDispatchToSearchProps from "../actions/search";
import Loading from "./Loading";

class MapSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapView: true,
      loading: false,
      location: {
        latitude: 10.7623717,
        longitude: 106.7061763,
        latitudeDelta: 0.04292,
        longitudeDelta: 0.03021
      },
      onMapRegion: {},
      markers: [],
      panDrag: [],
      polygon: [],
      marginBottom: 0
    };
    this.map;
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.toggleDrawOnMap = this.toggleDrawOnMap.bind(this);
    this.getPolygonAndMarkers = this.getPolygonAndMarkers.bind(this);
    this.drawPolyline = _.throttle(this.drawPolyline, 1000/60);
    this.regionChangeComplete = this.regionChangeComplete.bind(this);
  }

  componentDidMount() {
    this.props.getInitialData();
  }

  getCurrentLocation() {
    try {
      navigator.geolocation.getCurrentPosition(
        position => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04292,
            longitudeDelta: 0.03021
          };
          this.setRegion(region);
        },
        error => {
          console.log(error);
        }
      );
    } catch (e) {
      console.log(e.message || "");
    }
  }

  setRegion(region) {
    this.map.animateToRegion(region);
  }

  toggleDrawOnMap() {
    this.props.resetPropertyList();
    this.setState({
      isDrawing: !this.state.isDrawing,
      panDrag: [],
      polygon: [],
      markers: []
    });
  }

  getPolygonAndMarkers() {
    let polygonArr = this.state.panDrag.concat(this.state.panDrag[0]);
    this.props.getFilteredPropertiesList(this.props.propertyList, polygonArr, this.props.filterData);

    this.setState({
      isDrawing: !this.state.isDrawing,
      markers: this.props.filteredPropertiesList,
      polygon: polygonArr,
      panDrag: []
    });
  }

  panDragMap(e) {
    if (this.state.isDrawing) {
      this.drawPolyline(e.nativeEvent.coordinate);
    }
  }

  drawPolyline(coordinate) {
    let newArray = [
      ...this.state.panDrag,
      {
        ...coordinate
      }
    ];
    this.setState({
      panDrag: newArray
    });
  }

  regionChangeComplete(region) {
    this.setState({onMapRegion: {...region}});
  }

  getSnapShot() {
    console.log(this.props);
    // const snapshot = await Expo.takeSnapshotAsync(this.map, {
    //   result: 'file',
    //   format: 'jpeg'
    // });
    // snapshot.then((uri) => {
    //   console.log(uri);
    //   // this.props.getSnapshot(this.props.uuid, uri);
    // });
  }

  render() {
    return (
      <View style = {[{flex: 1, position: 'relative', opacity: 1}]}>
        <MapView
          style = {{flex: 1}}
          initialRegion={this.state.location}
          showsUserLocation = {true}
          showsMyLocationButton = {true} 
          scrollEnabled = {!this.state.isDrawing}
          onPanDrag = {e => this.panDragMap(e)}
          ref={(map) => this.map = map}
          onRegionChangeComplete={this.regionChangeComplete}
        >
          {this.props.filteredPropertiesList.map((marker) => (
              <MapView.Marker key = {marker.id}
                coordinate = {marker.coordinates}
              >
              </MapView.Marker>
          ))}
          {(this.state.panDrag.length > 0) &&
            (<MapView.Polyline coordinates = {this.state.panDrag}
              strokeWidth = {2}/>
            )
          }
          {(this.state.polygon.length > 0) &&
            (<MapView.Polygon coordinates = {this.state.polygon}
              strokeWidth = {2}
            />)
          }
        </MapView>

        <TouchableOpacity
            activeOpacity={0.8}
            style = {[styles.absoluteBtn, styles.currentLocation]}
            onPress = {this.getCurrentLocation}
          >
            <Icon name='gps-fixed' type = 'material_community' containerStyle = {styles.icon}/>
        </TouchableOpacity>

        { !this.state.mapView ? null :
          <TouchableOpacity
            activeOpacity={0.8}
            style = {[styles.absoluteBtn, styles.drawButton]}
            onPress = {this.toggleDrawOnMap}
          >
            <Icon name ={!this.state.isDrawing ? 'brush' : 'highlight-off'} type = 'material_community' containerStyle = {styles.icon}/>
          </TouchableOpacity>
        }
        {
          this.state.isDrawing && this.state.panDrag.length > 3 &&
          <TouchableOpacity
            activeOpacity={0.8}
            style = {[styles.absoluteBtn, styles.doneBtn]}
            onPress = {this.getPolygonAndMarkers}
          ><Icon name ='done-all' type = 'material_community' containerStyle = {styles.icon}/>
          </TouchableOpacity>
        }
        {
          this.state.polygon.length > 0  &&
          <TouchableOpacity
            activeOpacity={0.8}
            style = {[styles.absoluteBtn, styles.getListBtn]}
            onPress = {() => this.getSnapShot()}
          ><Text style={{color: '#fff'}}>Get snapshot!</Text>
          </TouchableOpacity>
        }
        {this.props.loading && <Loading/>}
      </View>
    );
  }
}
const mapStateToProps = function (state) {
  return {
    ...state.searchOnMap,
    uuid: state.login.uuid
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToSearchProps
)(MapSearch);