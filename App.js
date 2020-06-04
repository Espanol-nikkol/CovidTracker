import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tracker from './components/tracker';
import Detail from './components/detail';
import Country from './components/country';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function mainScreenComponent(props) {
  return (
    <View>
      <Text>A</Text>
      <Button title="Меню" onPress={() => props.navigation.openDrawer()} />
    </View>
  );
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Main Screen" component={mainScreenComponent} />
          {/*<Drawer.Screen name="Detail" component={Detail} />*/}
          {/*<Drawer.Screen name="Country" component={Country} />*/}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});

export default App;
