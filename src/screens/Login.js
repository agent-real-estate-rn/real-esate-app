import React, { Component } from 'react'
import { Button, View, TextInput, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import mapDispatchToLoginProps from '../actions/login';
import loginStyle from '../style/login';
import Expo from 'expo';
import firebase from '../firebase';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.handelClick = this.handelClick.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.navigation.navigate('Tabs');
      }

      // Do other things
    });
  }

  async handelClick() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1952254625024149', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      const dagta = (await response.json());
      console.log(dagta);

      let credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(err);
      });
    }
  }

  goToSignup() {
    console.log(this.props);
    this.props.navigation.navigate('SignupScreen');
  }

  render() {
    return (
      <View style={loginStyle.outer}>
        <View style={loginStyle.wrap}>
          <View style={loginStyle.textWrap}>
            <View style={loginStyle.textInner}>
              <Text style={loginStyle.textTitle}>Agent</Text>
              {/* <ActivityIndicator
                size="large"
                animating={this.props.isLoading}/> */}
              {this.props.name ? (<Text>Welcome</Text>) :(<Text > </Text>)}
            </View>
          </View>
          <View style={loginStyle.inputWrap}>
            <View style={loginStyle.inputInner}>
              <TextInput
                style={loginStyle.input}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                multiline={false}
                autoFocus={true}
                underlineColorAndroid="#f7f7f7"
                placeholder='Enter your email...'
                textContentType='username'
              />
              <TextInput style={loginStyle.input}
                multiline={false}
                onChangeText={(password) => this.setState({password})}
                secureTextEntry={true}
                underlineColorAndroid="#f7f7f7"
                placeholder='Enter your password...'
                textContentType='password'
              />
              <View style={loginStyle.buttonWrap}>
                <Button title='Login by Facebook' onPress={ this.handelClick} />
              </View>
            </View>
            <Button title='Signup' onPress={ this.goToSignup} />
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = function(state) {
  return {...state}
};

export default connect(
  mapStateToProps,
  mapDispatchToLoginProps
)(LoginScreen);
