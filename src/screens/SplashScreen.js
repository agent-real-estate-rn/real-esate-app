import React, {
  Component
} from 'react'
import { Text, View, ImageBackground, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import mapDispatchToLoginProps from '../actions/login';
import { connect } from 'react-redux';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.loginAuto();
  }

  render() {
    return ( 
      <View style={{flex: 1}}>
        <StatusBar
            backgroundColor="blue"
            barStyle="light-content"
          />
        <ImageBackground 
          source = {require('../../assets/alexander-andrews-457319.jpg')} 
          style={{width: '100%', height: '100%'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 1}}>
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.textTitle}>Welcome to Agent!</Text>
              <ActivityIndicator
                size="large"
                animating={true}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}
const mapStateToProps = function(state) {
  return { ...state.login };
};

export default connect(
  mapStateToProps,
  mapDispatchToLoginProps
)(SplashScreen);

const styles = StyleSheet.create({
  textTitle: {
    alignSelf: 'center',
    fontWeight: "bold",
    fontSize: 38,
    color: "#fff"
  }
})
