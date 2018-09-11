import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ButtonGroup, CheckBox, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import mapDispatchToSearchProps from '../actions/search';
class FilterContent extends Component {
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
       hasCategories: false
    }

    this.applyFilter = this.applyFilter.bind(this);
  }

  applyFilter() {
    this.props.updateFilter({...this.state});
    this.props.toggleModal();

    this.props.getFilteredPropertiesList(
      this.props.filteredPropertiesList,
      this.props.polygon,
      this.props.filterCategory
    );
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
          onValuesChange={(valuesArray)=> this.setState({priceRange: valuesArray, hasCategories: true})}
        />
        <Text> Size (sqm):  {this.state.size[0]} - {this.state.size[1]}</Text>
        <MultiSlider
          values={this.state.size}
          min={0}
          max={400}
          step={5}
          selectedStyle={{backgroundColor: '#223A5E'}}
          markerStyle={{height:15, width:15, backgroundColor: '#223A5E'}}
          onValuesChange={(valuesArray)=> this.setState({size: valuesArray, hasCategories: true})}
        />
        <Text> Beds: </Text>
        <ButtonGroup
          onPress={(selectedIndex)=> this.setState({beds: selectedIndex, hasCategories: true})}
          selectedIndex={this.state.beds}
          buttons={[1,2,3,4,'5+']}
          containerStyle={{justifyContent: 'flex-start', height: 30, marginLeft: 0, marginRight: 0}}
        />
        <Text> Bath: </Text>
        <ButtonGroup
          onPress={(selectedIndex)=> this.setState({bath: selectedIndex, hasCategories: true})}
          selectedIndex={this.state.bath}
          buttons={[1,2,3,'4+']}
          containerStyle={{justifyContent: 'flex-start', height: 30, marginLeft: 0, marginRight: 0}}
        />
        <View style={{paddingBottom:10}} />
        <CheckBox
          title='Parking:                                               '
          checked={this.state.parking}
          onIconPress={()=> this.setState({parking: !this.state.parking, hasCategories: true})}
          onPress={()=> this.setState({parking: !this.state.parking, hasCategories: true})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white', marginLeft: 0, marginRight: 0}}
          checkedIcon='check-square'
          checkedColor='#223A5E'
        />
        <CheckBox
          title='Security:                                              '
          checked={this.state.security}
          onIconPress={()=> this.setState({security: !this.state.security, hasCategories: true})}
          onPress={()=> this.setState({security: !this.state.security, hasCategories: true})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white', marginLeft: 0, marginRight: 0}}
          checkedIcon='check-square'
          checkedColor='#223A5E'
        />
        <CheckBox
          title='Cleaning Service:                              '
          checked={this.state.cleaning}
          onIconPress={()=> this.setState({cleaning: !this.state.cleaning, hasCategories: true})}
          onPress={()=> this.setState({cleaning: !this.state.cleaning, hasCategories: true})}
          iconRight
          right
          containerStyle = {{backgroundColor: 'white', marginLeft: 0, marginRight: 0}}
          checkedIcon='check-square'
          checkedColor='#223A5E'
        />
          <TouchableOpacity
            style={!this.state.hasCategories ? styles.btnDiabled : styles.btn}
            activeOpacity={0.9}
            disabled={!this.state.hasCategories}
            onPress={this.applyFilter}
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
const mapStateToProps = (state) => {
  return {...state}
}
export default connect(
  mapStateToProps,
  mapDispatchToSearchProps
)(FilterContent);


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
  btnDiabled: {
    alignItems: 'center',
    alignContent: 'flex-end',
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginTop: 20
  }
})
