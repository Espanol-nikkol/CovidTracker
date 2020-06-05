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
let puk = 'PUK';

class App extends Component {
  state = {
    json: null,
  };
  url =
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-01-02/2020-05-30';

  async getData() {
    try {
      let response = await fetch(this.url)
        .then(resp => resp.json())
        .then(json => this.setState({json: json.data}));
      // let json = await response.json();
      // this.setState({json: json.data});
    } catch (error) {
      //обработка ошибки
      throw error;
    }
  }
  render() {
    let tableData = [];
    if (this.state.json === null) {
      this.getData().then(() => {
        let keys = Object.keys(this.state.json);
        keys.forEach(i => {
          let record = this.state.json[i].RUS;
          if (record !== undefined) {
            tableData.push(record);
          }
        });
      });
    }
    // console.log(this);
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="main" component={mainScreenComponent} />
          <Drawer.Screen name="Detail" initialParams={{puk}} component={Detail} />
          {/*<Drawer.Screen name="Country" component={Country} />*/}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});

export default App;
