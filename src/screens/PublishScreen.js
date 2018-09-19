import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,} from 'react-native'
import Camera from '../Components/Camera'
import FloatingLabelInput from '../Components/FloatingInput';
import loginStyle from '../style/login';

export default class PublishScreen extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       address: '',
       price: '',
       description: '',
       size: '',
       bedrooms: '',
       bathrooms: '',
    }
  }
  
  render() {
 
    return (
      <DismissKeyboard>
      <View style={{flex: 1, position: 'relative'}}>
      
        <ScrollView style={{padding: 15}}>
        <View style={loginStyle.inputInner}>

          <FloatingLabelInput
            style={styles.textinput}
            label="Address:"
            multiline={false}
            labelStyling ={{color: '#000'}}
            textStyle={{color: '#000'}}
            value={this.state.address}
            onChangeText={(text)=>this.setState({address: text})}
          />
          <FloatingLabelInput
            style={styles.textinput}
            label="Description:"
            multiline={false}
            labelStyling ={{color: '#000'}}
            textStyle={{color: '#000'}}
            value={this.state.description}
            onChangeText={(text)=>this.setState({description: text})}
          />
          <FloatingLabelInput
            style={styles.textinput}
            label="Bedrooms:"
            multiline={false}
            labelStyling ={{color: '#000'}}
            textStyle={{color: '#000'}}
            value={this.state.bedrooms}
            inputAccessoryView
            onChangeText={(text)=>this.setState({bedrooms: text})} keyboardType = 'numeric' maxLength={3}
          />
          <FloatingLabelInput
            style={styles.textinput}
            label="Bathrooms:"
            multiline={false}
            labelStyling ={{color: '#000'}}
            textStyle={{color: '#000'}}
            value={this.state.bathrooms}
            inputAccessoryView
            onChangeText={(text)=>this.setState({bathrooms: text})} keyboardType = 'numeric' maxLength={3}
          />
          <FloatingLabelInput
            style={styles.textinput}
            label="Price:"
            multiline={false}
            labelStyling ={{color: '#000'}}
            textStyle={{color: '#000'}}
            value={this.state.price}
            inputAccessoryView
            onChangeText={(text)=>this.setState({price: text})} keyboardType = 'numeric' maxLength={3}
          />
          <FloatingLabelInput
            style={styles.textinput}
            label="Size:"
            value={this.state.size}
            labelStyling ={{color: '#000'}}
            textStyle={{color: '#000'}}
            onChangeText={(text)=>this.setState({size: text})} keyboardType = 'numeric' maxLength={10}
          />
          <View style={{marginTop:20}}><Camera /></View>

          <TouchableOpacity
            style={[styles.btn, {marginBottom: 30}]}
            activeOpacity={0.9}
            onPress={()=>alert('Listing Successfully Published')}
          >
            <Text style={styles.btnText}>Publish My Listing</Text>
          </TouchableOpacity>
          </View>
        </ScrollView>
        {/* <KeyboardAvoidingView behavior="padding" enabled /> */}
        
      </View>
      </DismissKeyboard>
    )
  }
}

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    alignContent: 'flex-end',
    padding: 10,
    backgroundColor: '#223A5E',
    borderRadius: 5,
    marginTop: 20
  },
  textinput: {
    flex: 1,  
    paddingTop: 20,
    paddingLeft: 20,
    marginTop: 10,  
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ffffff'
  },

})