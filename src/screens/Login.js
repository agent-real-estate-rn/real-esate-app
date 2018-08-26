import React, { Component } from 'react'
import { Button, View, TextInput, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import mapDispatchToLoginProps from '../actions/login';
import loginStyle from '../style/login';

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

  handelClick() {
    // this.props.login(this.props.navigation, this.state.name, this.state.password);
    this.props.navigation.navigate('Tabs');
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
              <Text style={loginStyle.textTitle}>iMess</Text>
              <ActivityIndicator
                size="large"
                animating={this.props.isLoading}/>
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
                <Button title='Login' onPress={ this.handelClick} />
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
