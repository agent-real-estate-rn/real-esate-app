import React, { Component } from 'react';
import { StyleSheet, Button, View, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import loginStyle from '../style/login';
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };

    this.goToLogin = this.goToLogin.bind(this);
  }
  handelClick() {
    console.log('do something here!!');
  }
  goToLogin() {
    this.props.navigation.navigate('LoginScreen');
  }

  render() {
    return (
      <View style={loginStyle.outer}>
        <View style={loginStyle.wrap}>
          <View style={loginStyle.textWrap}>
            <View style={loginStyle.textInner}>
              <Text style={loginStyle.textTitle}>Sign up screen</Text>
              {this.props.name ? (<Text>Welcome </Text>) :(<Text > </Text>)}
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
                <Button title='Sign up' onPress={ this.handelClick} />
              </View>
            </View>
            <Button title='login' onPress={this.goToLogin} />
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
      </View>
    )
  }
}
