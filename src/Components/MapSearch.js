import React, { Component } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import styles from "../style/searchscreen";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import geolib from "geolib";
import _ from "lodash";
import { Icon, SearchBar } from "react-native-elements";
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
      markers: [],
      panDrag: [],
      polygon: [],
      marginBottom: 0
    };
    this.map;
    this.getCurrentLocation = this.getCurrentLocation.bind(this);
    this.toggleDrawOnMap = this.toggleDrawOnMap.bind(this);
    this.getPolygonAndMarkers = this.getPolygonAndMarkers.bind(this);
    this.drawPolyline = _.throttle(this.drawPolyline, 120);
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
    // markers = this.props.propertyList.map(item => {
    //   return item.coordinates;
    // });
    // this.setState({
    //   markers: markers
    // });
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
    this.props.getFilteredPropertiesList(this.props.propertyList, polygonArr);

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
  render() {
    return (
      <View style = {[{flex: 1, position: 'relative', opacity: 1}]}>
        {/* <View style={{marginTop:60, marginLeft:10, flexDirection:'row'}} >
            <SearchBar lightTheme clearIcon containerStyle={{width: 270}}  />
            <View style={{marginLeft: 20}}><Button title={this.state.mapView ? 'List' : 'Map'} onPress={()=>this.setState({mapView: !this.state.mapView})}/></View>
          </View> */}
        <MapView
          style = {{flex: 1}}
          initialRegion={this.state.location}
          showsUserLocation = {true}
          showsMyLocationButton = {true}
          scrollEnabled = {!this.state.isDrawing}
          onPanDrag = {e => this.panDragMap(e)}
          ref={(map) => this.map = map}
        >
          {this.props.filteredPropertiesList.map((marker, key) => (
              <MapView.Marker key = {key}
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
            onPress = {() => this.props.toggleMap()}
          ><Text style={{color: '#fff'}}>Get properties list!</Text>
          </TouchableOpacity>
        }
        {this.props.loading && <Loading/>}
      </View>
    );
  }
}
const mapStateToProps = function (state) {
  return { ...state.searchOnMap};
};

export default connect(
  mapStateToProps,
  mapDispatchToSearchProps
)(MapSearch);