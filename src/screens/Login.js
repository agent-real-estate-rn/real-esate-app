import React, { Component } from "react";
import {
  Button,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import mapDispatchToLoginProps from "../actions/login";
import loginStyle from "../style/login";

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
    // this.props.loginAuto(this.props.navigation)
  }

  handleLoginEmail() {
    this.props.loginByUsernamePassword(this.state.email, this.state.password, this.props.navigation, );
  }

  handleLoginFB() {
    this.props.loginByFacebook()
  }

  goToSignup() {
    console.log(this.props);
    this.props.navigation.navigate("SignupScreen");
  }

  render() {
    return (
      <View style={loginStyle.outer}>
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
              <TextInput
                style={loginStyle.input}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                multiline={false}
                autoFocus={true}
                underlineColorAndroid="#f7f7f7"
                placeholder= "Enter your email..."
                textContentType="username"
              />
              <TextInput
                style={loginStyle.input}
                multiline={false}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                underlineColorAndroid="#f7f7f7"
                placeholder="Enter your password..."
                textContentType="password"
              />
              <View style={loginStyle.buttonWrap}>
                <Button title="Login" onPress={this.handleLoginEmail}/>
              </View>
              <Button title="LoginFB" onPress={this.handleLoginFB} />
            </View>
            <Button title="Signup" onPress={this.goToSignup} />
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled />
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return { ...state };
};

export default connect(
  mapStateToProps,
  mapDispatchToLoginProps
)(LoginScreen);
