import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Easing, StyleSheet } from 'react-native';
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
      <FilterContent toggleModal={this.toggleModal} />
    </View>
  );

  frontSide() {
    return (
      <View style={{flex:1}} toggleMap={this.flip}>
        <MapSearch />
        <Modal
          isVisible={this.state.modalVisible}
          style={styles.bottomModal}
          onBackdropPress={this.toggleModal}
          swipeDirection='right'
          onSwipe={this.toggleModal}
        >
          {this.renderModalContent()}
        </Modal>
      </View>
    );
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
    backgroundColor: '#f7f7f7',
    padding: 22,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 650
  },
  bottomModal: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    flex: 1

  },
})
