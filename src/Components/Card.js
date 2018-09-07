import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import styles from '../style/listViewStyle';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {screen: Dimensions.get('window')};
    this.onLayout = this.onLayout.bind(this);
  }

  onLayout() {
    this.setState({screen: Dimensions.get('window')});
  }

  render() {
    let screenWidth = this.state.screen.width - 30;
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={()=> this.props.navigation.navigate('PropertyDetailScreen', this.props)}
        style={styles.card}>
        <Image
          style={{width: screenWidth, height: (screenWidth * 9 / 16)}}
          source={{ uri: this.props.imgUrl[0] }}
        />
        <View style={styles.cardDesc}>
          <Text style={styles.building}>{this.props.description.buildingName}</Text>
          <Text>{this.props.address.street} - {this.props.address.district} {this.props.address.city}</Text>
          <Text>${this.props.description.price}/month | {this.props.description.bdrm} bdrm | {this.props.description.bdrm} bath | {this.props.description.size}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}