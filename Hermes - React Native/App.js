import React from 'react';
import { View} from 'react-native';
import Nav from './Nav';

export default class App extends React.Component {

  render() {
    return (
      <View style={{flex:1}}>
        <Nav />
      </View>
    );
  }
}

