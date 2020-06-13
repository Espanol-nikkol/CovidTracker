import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import Detail from './components/detail';
import Country from './components/country';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './components/Main';

const Drawer = createDrawerNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={Main} />
          <Drawer.Screen name="Detail" component={Detail} />
          <Drawer.Screen name="Country" component={Country} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});

export default App;
