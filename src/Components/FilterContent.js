import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { ButtonGroup, CheckBox, Button, Icon } from 'react-native-elements'


export default class FilterContent extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       priceRange: [0,2000],
       beds: 0,
       bath: 0,
       size: [0,400],
       parking: false,
       security: false,
       cleaning: false,
    }
  }
  
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{justifyContent: 'flex-start', alignSelf: 'center'}}><Text style={styles.titleText}>Filter</Text></View>
        <View style={styles.lineDivider} />
        <Text> Price:  {this.state.priceRange[0]} - {this.state.priceRange[1]}</Text>
        <MultiSlider 
          values={this.state.priceRange}
          min={0}
          max={2000}
          step={25}
          selectedStyle={{backgroundColor: '#223A5E'}}
          markerStyle={{height:15, width:15, backgroundColor: '#223A5E'}}  
          onValuesChange={(valuesArray)=> this.setState({priceRange: valuesArray})}
        />
        <Text> Size (sqm):  {this.state.size[0]} - {this.state.size[1]}</Text>
        <MultiSlider 
          values={this.state.size}
          min={0}
          max={400}
          step={5}
          selectedStyle={{backgroundColor: '#223A5E'}}
          markerStyle={{height:15, width:15, backgroundColor: '#223A5E'}}  
          onValuesChange={(valuesArray)=> this.setState({size: valuesArray})}
        />
        <Text> Beds: </Text>
        <ButtonGroup
          onPress={(selectedIndex)=> this.setState({beds: selectedIndex})}
          selectedIndex={this.state.beds}
          buttons={[1,2,3,4,'5+']}
          containerStyle={{justifyContent: 'flex-start', height: 30, marginLeft: 0, marginRight: 0}}
        />
        <Text> Bath: </Text>
        <ButtonGroup
          onPress={(selectedIndex)=> this.setState({bath: selectedIndex})}
          selectedIndex={this.state.bath}
          buttons={[1,2,3,'4+']}
          containerStyle={{justifyContent: 'flex-start', height: 30, marginLeft: 0, marginRight: 0}}
        />
        <View style={{paddingBottom:10}} />
        <CheckBox
          title='Parking:                                               '
          checked={this.state.parking}
          onIconPress={()=> this.setState({parking: !this.state.parking})}
          onPress={()=> this.setState({parking: !this.state.parking})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white', marginLeft: 0, marginRight: 0}}
          checkedIcon='check-square'
          checkedColor='#223A5E'
        />
        <CheckBox
          title='Security:                                              '
          checked={this.state.security}
          onIconPress={()=> this.setState({security: !this.state.security})}
          onPress={()=> this.setState({security: !this.state.security})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white', marginLeft: 0, marginRight: 0}}
          checkedIcon='check-square'
          checkedColor='#223A5E'
        />
        <CheckBox
          title='Cleaning Service:                              '
          checked={this.state.cleaning}
          onIconPress={()=> this.setState({cleaning: !this.state.cleaning})}
          onPress={()=> this.setState({cleaning: !this.state.cleaning})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white', marginLeft: 0, marginRight: 0}}
          checkedIcon='check-square'
          checkedColor='#223A5E'
        />
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={()=>{this.props.applyFilter({...this.state}); this.props.toggleModal()}}
          >
            <Text style={styles.btnText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnClose} onPress={()=>this.props.toggleModal()}>
            <Icon name='times-circle' type='font-awesome' color='#223A5E' />
          </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  lineDivider: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    alignItems: 'center',
    alignContent: 'flex-end',
    padding: 10,
    backgroundColor: '#223A5E',
    borderRadius: 5,
    marginTop: 20
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ffffff'
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0
  },
})
