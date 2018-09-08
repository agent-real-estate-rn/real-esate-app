import React, { Component } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView, TouchableOpacity,
  ActivityIndicator, StatusBar
} from "react-native";
import { SocialIcon } from 'react-native-elements';
import { connect } from "react-redux";
import mapDispatchToLoginProps from "../actions/login";
import loginStyle from "../style/login";
import FloatingLabelInput from '../Components/FloatingInput';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.handleLoginEmail = this.handleLoginEmail.bind(this);
    this.handleLoginFB = this.handleLoginFB.bind(this);
    this.goToSignup = this.goToSignup.bind(this);
  }

  componentDidMount() {
    // this.props.loginAuto()
  }

  handleLoginEmail() {
    this.props.loginByUsernamePassword(this.state.email, this.state.password);
  }

  handleLoginFB() {
    this.props.loginByFacebook()
  }

  goToSignup() {
    this.props.navigation.navigate("SignupScreen");
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
              <Text style={loginStyle.textTitle}>Agent</Text>
              <ActivityIndicator
                size="large"
                animating={this.props.isLoading}
              />
              {this.props.name ? <Text>Welcome</Text> : <Text> </Text>}
            </View>
          </View>
          <View style={loginStyle.inputWrap}>
            <View style={loginStyle.inputInner}>
              <FloatingLabelInput
                style={loginStyle.input}
                label="Email"
                multiline={false}
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
                underlineColorAndroid="transparent"
                textContentType="password"
              />
              <TouchableOpacity
                style={[loginStyle.buttonWrap, loginStyle.loginBtn]}
                onPress={this.handleLoginEmail}
              >
                <Text
                  style={{color: "#223A5E", textAlign: 'center'}}
                  onPress={this.handleLoginEmail}
                 >Login</Text>
              </TouchableOpacity>
              <View style={loginStyle.buttonWrap}>
                <SocialIcon
                  title='Sign In With Facebook'
                  button
                  onPress={this.handleLoginFB}
                  type='facebook'
                  style={{marginLeft: 0, marginRight: 0}}
                />
              </View>
            </View>
            <TouchableOpacity style={loginStyle.buttonWrap} onPress={this.goToSignup}>
              <Text style={{color: "#fff", textAlign: 'center'}}>Don't have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled />
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return { ...state.login };
};

export default connect(
  mapStateToProps,
  mapDispatchToLoginProps
)(LoginScreen);
