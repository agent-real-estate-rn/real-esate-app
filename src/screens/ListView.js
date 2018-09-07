import React, { Component } from "react";
import { connect } from 'react-redux';
import { Text, StyleSheet, View, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
//import TEST_DATA from "../listingArray.json";
import styles from '../style/listViewStyle';
import Card from '../Components/Card';

class ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {screen: Dimensions.get('window')};
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({screen: Dimensions.get('window')});
  }

  render() {
    return (
      <View style={styles.container} onLayout = {this.onLayout.bind(this)}>
        {this.props.filteredPropertiesList.length > 0 ? (
          <FlatList
         style={styles.flatList}
          data={this.props.filteredPropertiesList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Card {...item} navigation={this.props.navigation} />
          )}
        />
        ) : (
          <Text style={{alignSelf: 'center', color: '#ccc'}}> No properties found! </Text>
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {...state.searchOnMap}
}

export default connect(mapStateToProps)(ListView);