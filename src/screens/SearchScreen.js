import React, { Component } from 'react';
import { Text, TouchableOpacity, Easing, StyleSheet } from 'react-native';
import ListView from './ListView';
import MapSearch from '../Components/MapSearch';
import FlipView from 'react-native-flip-view-next';

export default class SearchScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={() => navigation.getParam('flipScreen')()}
        ><Text style={styles.btnText}>{navigation.getParam('flipText') || 'List'}</Text>
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props);

    this.state = { isFlipped: false};
    this.flip = this.flip.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({flipScreen: this.flip, flipText: "List"});
  }

  flip = () => {
    const flipText = '';
    if (!this.state.isFlipped) {
      this.props.navigation.setParams({flipText: 'Map'});
    } else {
      this.props.navigation.setParams({flipText: 'List'});
    }
    this.setState({
      isFlipped: !this.state.isFlipped,
    });
  }

  frontSide() {
    return (<MapSearch toggleMap={this.flip}/>);
  }
  backSide() {
    return(<ListView navigation={this.props.navigation}/>);
  }
  render() {
    return(
      <FlipView style={{flex: 1}}
        front={this.frontSide()}
        back={this.backSide()}
        isFlipped={this.state.isFlipped}
        flipAxis="y"
        flipEasing={Easing.out(Easing.ease)}
        flipDuration={500}
        perspective={1000}/>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 20,
    padding: 5,
    backgroundColor: '#223A5E',
    borderRadius: 5,
    width: 60
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ffffff'
  }
})
