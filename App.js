import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import Tracker from './components/tracker';
import Detail from './components/detail';
import Country from './components/country';
import LoadData from './components/loadData';
import RealmDB from './components/realmDB';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './components/Main';

const Drawer = createDrawerNavigator();

class App extends Component {
  render() {
    // console.log('RENDER APP');
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="main" component={Main} />
          <Drawer.Screen name="Detail" component={Detail} />
          <Drawer.Screen name="Country" component={Country} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});

export default App;
