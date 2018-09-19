import React, { Component } from 'react';
import { StatusBar, Button, View, TextInput, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import loginStyle from '../style/login';
import firebase from '../firebase'
import { SocialIcon } from 'react-native-elements';
import FloatingLabelInput from '../Components/FloatingInput';

export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email:'',
      password:''
    };
    this.handleClick = this.handleClick.bind(this)
    this.goToLogin = this.goToLogin.bind(this);
  }

  handleClick() {
    try {
      if (this.state.password.length < 6 ) {
        alert("Please enter at least 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      alert('success!')
    } catch (error) {
      console.log(error.toString());
    }
  }


  goToLogin() {
    this.props.navigation.navigate('LoginScreen', {email: this.state.email, password: this.state.password});
  }

  render() {
    return (
      <View style={loginStyle.outer}>
        <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
          />
        <View style={loginStyle.wrap}>
          <View style={loginStyle.textWrap}>
            <View style={loginStyle.textInner}>
              <Text style={loginStyle.textTitle}>Sign up</Text>
              {this.props.name ? (<Text>Welcome </Text>) :(<Text > </Text>)}
            </View>
          </View>
          <View style={loginStyle.inputWrap}>
            <View style={loginStyle.inputInner}>
            <FloatingLabelInput
                style={loginStyle.input}
                label="Email"
                multiline={false}
                textStyle={{color: '#fff'}}
                value={this.state.email}
                textContentType='emailAddress'
                onChangeText={email => this.setState({ email })}
              />
              <FloatingLabelInput
                style={loginStyle.input}
                multiline={false}
                label="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                textContentType='password'
                secureTextEntry
                textStyle={{color: '#fff'}}
                underlineColorAndroid="transparent"
                textContentType="password"
              />
              <TouchableOpacity
                style={[loginStyle.buttonWrap, loginStyle.loginBtn]}
                onPress={this.handleClick}
              >
                <Text
                  title='Sign up'
                  style={{color: "#223A5E", textAlign: 'center'}}
                >Sign up
                </Text>
              </TouchableOpacity>
              </View>
              <View style={loginStyle.buttonWrap}>
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    onPress={this.handleLoginFB}
                    type='facebook'
                    style={{marginLeft: 0, marginRight: 0}}
                  />
              </View>
              <TouchableOpacity style={loginStyle.buttonWrap} onPress={this.goToLogin} >
                <Text style={{color: "#fff", textAlign: 'center'}}>Already have an account?</Text>
              </TouchableOpacity>
            </View>
          </View>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
      </View>
    )
  }
}
