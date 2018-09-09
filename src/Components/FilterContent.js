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
      <View>
        <View style={{alignItems: 'center'}}><Text style={styles.titleText}>Filter</Text></View>
        <View style={styles.lineDivider} />
        <Text> Price:  ${this.state.priceRange[0]} - ${this.state.priceRange[1]}</Text>
        <MultiSlider 
          values={this.state.priceRange} 
          sliderLength={280}
          min={0}
          max={2000}
          step={25}
          markerStyle={{height:15, width:15}}  
          onValuesChange={(valuesArray)=> this.setState({priceRange: valuesArray})}
        />
        <Text> Size (sqm):  {this.state.size[0]} - {this.state.size[1]}</Text>
        <MultiSlider 
          values={this.state.size} 
          sliderLength={280}
          min={0}
          max={400}
          step={5}
          markerStyle={{height:15, width:15}}  
          onValuesChange={(valuesArray)=> this.setState({size: valuesArray})}
        />
        <Text> Beds: </Text>
        <ButtonGroup
          onPress={(selectedIndex)=> this.setState({beds: selectedIndex})}
          selectedIndex={this.state.beds}
          buttons={[0,1,2,3,4,'5+']}
          containerStyle={{height: 30}}
        />
        <Text> Bath: </Text>
        <ButtonGroup
          onPress={(selectedIndex)=> this.setState({bath: selectedIndex})}
          selectedIndex={this.state.bath}
          buttons={[0,1,2,3,'4+']}
          containerStyle={{height: 30}}
        />
        <View style={{paddingBottom:20}} />
        <CheckBox
          title='Parking:                                               '
          checked={this.state.parking}
          onIconPress={()=> this.setState({parking: !this.state.parking})}
          onPress={()=> this.setState({parking: !this.state.parking})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white'}}
          checkedIcon='check-square'
          checkedColor='#bfbfbf'
        />
        <CheckBox
          title='Security:                                              '
          checked={this.state.security}
          onIconPress={()=> this.setState({security: !this.state.security})}
          onPress={()=> this.setState({security: !this.state.security})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white'}}
          checkedIcon='check-square'
          checkedColor='#bfbfbf'
        />
        <CheckBox
          title='Cleaning Service:                              '
          checked={this.state.cleaning}
          onIconPress={()=> this.setState({cleaning: !this.state.cleaning})}
          onPress={()=> this.setState({cleaning: !this.state.cleaning})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white'}}
          checkedIcon='check-square'
          checkedColor='#bfbfbf'
        />
        <View style={{margin:20}} />

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.9}
          onPress={()=>{this.props.applyFilter({...this.state}); this.props.toggleModal()}}
        >
          <Text style={styles.btnText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnClose} onPress={()=>this.props.toggleModal()}>
          <Icon name='times-circle' type='font-awesome' color='#cecece' />
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  lineDivider: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3,
    marginBottom: 20,
    marginTop: 20
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    alignSelf: 'center',
    padding: 5,
    backgroundColor: '#cecece',
    borderRadius: 5,
    width: 270,
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#ffffff'
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 5
  },
})
