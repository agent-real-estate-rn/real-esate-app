import React, { Component } from 'react';
import { View, Text, Button, Animated, TouchableOpacity, Easing, StyleSheet } from 'react-native';
import ListView from './ListView';
import MapSearch from '../Components/MapSearch';
import FlipView from 'react-native-flip-view-next';
import Modal from 'react-native-modal'
import FilterContent from '../Components/FilterContent'

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
      ),
      headerLeft: (
        <TouchableOpacity
          style={styles.btnLeft}
          activeOpacity={0.9}
          onPress={() => navigation.getParam('toggleModal')()}
        ><Text style={styles.btnText}>Filter</Text>
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props);

    this.state = { isFlipped: false, modalVisible: false, filterData: null, };
    this.flip = this.flip.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({flipScreen: this.flip, flipText: "List", toggleModal: this.toggleModal});
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

  toggleModal = () => {
    this.setState({modalVisible: !this.state.modalVisible})
  }

  applyFilter = (filterData) => {
    this.setState({filterData: filterData})
  }

  renderModalContent = () => (
    <View style={styles.modalContent}>
      <FilterContent toggleModal={this.toggleModal} applyFilter={this.applyFilter} />
    </View>
  );

  frontSide() {
    return (
      <View style={{flex:1}}>
        <MapSearch toggleMap={this.flip} filterData={this.state.filterData}/>
        <Modal
          isVisible={this.state.modalVisible} 
          style={styles.bottomModal} 
          onBackdropPress={this.toggleModal} 
          swipeDirection='right' 
          onSwipe={this.toggleModal}
        >
          {this.renderModalContent()}
        </Modal>
      </View>);
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
  },
  btnLeft: {
    marginLeft: 20,
    padding: 5,
    backgroundColor: '#223A5E',
    borderRadius: 5,
    width: 60
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 650
  },
  bottomModal: {
    justifyContent: 'flex-start',
    marginTop: 90,
    paddingRight: 30,
    width: 370,
    
  },
})
