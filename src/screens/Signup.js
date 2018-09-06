import React, { Component } from 'react';
import { StatusBar, Button, View, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import loginStyle from '../style/login';
import firebase from '../firebase'
import { SocialIcon } from 'react-native-elements';

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
              <TextInput
                style={loginStyle.input}
                onChangeText={(email) => this.setState({email})}
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
                <Button title='Sign up' onPress={this.handleClick} color="#fff"/>
              </View>
              <View style={loginStyle.buttonWrap}>
                <SocialIcon
                    title='Sign In With Facebook'
                    button
                    onPress={this.handleLoginFB}
                    type='facebook'
                  />
              </View>
            </View>
            <Button title='Already have an account?' onPress={this.goToLogin} color="#fff"/>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
      </View>
    )
  }
}
