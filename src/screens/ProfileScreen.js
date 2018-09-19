import React, { Component } from 'react'
import { Text, View , StyleSheet, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import firebase from '../firebase';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }
  logout() {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('LoginScreen');
    });
  }
  render() {
    return (
      <View>
        {this.props.userInfo.photoURL && <Image source={{uri: this.props.userInfo.photoURL}} style={{width: 200, height: 200, alignSelf: 'center'}}/>}
        <Text style={{marginTop: 20, fontSize: 24, textAlign: 'center'}}>{this.props.userInfo.displayName}</Text>
        <TouchableOpacity
          style={[styles.buttonWrap, styles.loginBtn]}
          onPress={this.logout}
        >
          <Text
            style={{color: "#f7f7f7", textAlign: 'center'}}
            >Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {...state.login}
}
export default connect(
  mapStateToProps
)(ProfileScreen);

const styles = StyleSheet.create({
  buttonWrap: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
  loginBtn: {
    backgroundColor: '#223A5E',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30
  }
})
