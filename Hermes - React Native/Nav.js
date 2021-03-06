import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Home from './Containers/Home';
import Analytics from './Containers/Analytics';

export default Nav = createStackNavigator(
  {
    Home: { 
      screen: Home, 
      navigationOptions: ({ navigation }) => ({
        title: 'Available Devices', 
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#D32F2F',
        },
      }),
    },
    Analytics: { 
      screen: Analytics,
      navigationOptions: ({ navigation }) => ({
        title: `${ navigation.state.params } data`,
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#D32F2F',
        },
      })
    },
  },
);
