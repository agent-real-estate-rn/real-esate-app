import React, { Component } from 'react'
import { Button, View, TextInput, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import mapDispatchToProps from '../actions';
import loginStyle from '../style/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: ''
    };
    this.handelClick = this.handelClick.bind(this);
  }

  handelClick() {
    this.props.login(this.props.navigation, this.state.name, this.state.password);
  }

  render() {
    return (
      <View style={loginStyle.outter}>
        <View style={loginStyle.wrap}>
          <View style={loginStyle.textWrap}>
            <View style={loginStyle.textInner}>
              <Text style={loginStyle.textTitle}>iMess</Text>
              <ActivityIndicator
                size="large"
                animating={this.props.isLoading}/>
              {this.props.name ? (<Text>Welcome {this.props.name}</Text>) :(<Text > </Text>)}
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
          </View>
        </View>
        <KeyboardAvoidingView behavior="padding" enabled></KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = function(state) {
  return {...state.login}
};

export default connect(
  mapStateToProps,
  mapDispatchToLoginProps
)(Login);
