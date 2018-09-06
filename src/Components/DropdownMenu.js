import React, { Component } from 'react'
import { Dropdown } from 'react-native-material-dropdown';

export default class DropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Java',
      category: [
        {data: '1-room', label: '1 room'},
        {data: '2-room', label: '2 rooms'},
        {data: '3-room', label: '3 rooms'},
        {data: '4-room', label: '4 rooms'}
      ]
     };
  }

  render() {
    return (
      <Dropdown
        label='Room ??'
        data={this.state.category}
      />
    )
  }
}