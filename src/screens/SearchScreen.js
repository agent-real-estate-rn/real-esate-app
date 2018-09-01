import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { connect } from "react-redux";
import MapView from 'react-native-maps';
import geolib from 'geolib';
import _ from 'lodash';
import mapDispatchToSearchProps from '../actions/search';
class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      panDrag: [],
      polygon: []
    };
    this.toggleDrawOnMap = this.toggleDrawOnMap.bind(this);
    this.filterMarker = this.filterMarker.bind(this);
    this.handleDrawing = this.handleDrawing.bind(this);
    this.drawPolygon = _.throttle(this.drawPolygon, 150);
  }
  // componentWillMount() {
  //   setTimeout(() => {
  //     this.setState({statusBarHeight: StatusBar.currentHeight});
  //   }, 500);
  // }

  componentDidMount() {
    this.props.getCurrentLocation();
  }

  toggleDrawOnMap() {
    this.setState({
      isDrawing: !this.state.isDrawing,
      panDrag: [],
      polygon: []
    });
  }

  drawPolygon(coordinate) {
    let newArray = [...this.state.panDrag, {...coordinate}];
    this.setState({
      panDrag: newArray
    });
  }
  handleDrawing(e) {
    if (this.state.isDrawing) {
      this.drawPolygon(e.nativeEvent.coordinate);
    }
  }

  filterMarker() {
    let getMarker = this.state.markers.filter(marker => {
      if(geolib.isPointInside(marker.coordinate, this.state.panDrag)) {
        return marker;
      }
    });
    let list = this.state.panDrag.concat(this.state.panDrag[0]);
    this.setState({markers: getMarker,
      polygon: list,
      panDrag: [],
      isDrawing: !this.state.isDrawing
    });
  }

  render() {
    return(
      <View style={{flex: 1, position: 'relative'}}>
        <MapView
          style={{flex: 1}}
          initialRegion={this.props.initialLocation}
          showsUserLocation={true}
          showsMyLocationButton={true}
          minZoomLevel={8}
          maxZoomLevel={15}
          scrollEnabled={!this.state.isDrawing}
          onPanDrag={(e) =>this.handleDrawing}
        >
          {this.props.markerArr && this.props.markerArr.map((marker, key) => (
            <MapView.Marker key={key} coordinate={marker.coordinate}>
            </MapView.Marker>
          ))}
          {this.state.panDrag && <MapView.Polyline
            coordinates={this.state.panDrag}
            fillColor='red'
          />}
          {this.state.polygon && <MapView.Polygon
            fillColor='red'
            coordinates={this.state.polygon}
            strokeWidth={2}
            style={{opacity: 0.6}}
          />}
        </MapView>
        <Button
          style={{position: 'absolute', top: 0}}
          title='Daw'
          onPress={this.toggleDrawOnMap}
        />
        <Button
          style={{position: 'absolute', top: 0}}
          title='Get marker inside polygon!'
          onPress={this.filterMarker}
        />
      </View>
    )
  }
}

const mapStateToProps = function(state) {
  return { ...state.searchOnMap};
};

export default connect(
  mapStateToProps,
  mapDispatchToSearchProps
)(SearchScreen);