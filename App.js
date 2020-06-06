import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tracker from './components/tracker';
import Detail from './components/detail';
import Country from './components/country';
import LoadData from './components/loadData';
import RealmDB from './components/realmDB';
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

  render() {
    let tableData = [];
    if (this.state.json === null) {
      (async () => {
        let data = await LoadData.getStats('US');
        RealmDB.sendNewDataToBase({
          id: 'US',
          data: data,
        });
        this.setState({json: JSON.parse(data).timelineitems[0]});
        let keys = Object.keys(this.state.json);
        keys.forEach(i => {
          let record = this.state.json[i];
          if (record !== undefined && typeof record === 'object') {
            record.date = i;
            tableData.push(record);
          }
        });
      })();
    }
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="main" component={mainScreenComponent} />
          <Drawer.Screen
            name="Detail"
            initialParams={{puk}}
            component={Detail}
          />
          {/*<Drawer.Screen name="Country" component={Country} />*/}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const style = StyleSheet.create({});

export default App;
