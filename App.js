import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Tracker from './components/tracker';
import Detail from './components/detail';
import Country from './components/country';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Realm = require('realm');
const Drawer = createDrawerNavigator();
const DataSchema = {
  name: 'Data',
  properties: {
    day: {
      country: {
        confirmed: 'int',
        country_code: 'string',
        date_value: 'string',
        deaths: 'int',
        stringency: 'float',
        stringency_actual: 'float',
        stringency_legacy: 'float',
        stringency_legacy_disp: 'float',
      },
    },
  },
};
// Realm.open({schema: [CarSchema]}).then(realm => {
//   realm.write(() => {
//     const myCar = realm.create('Car', {
//       make: 'Honda',
//       model: 'Civic',
//       miles: 1000,
//     });
//     myCar.miles += 20; // Update a property value
//     console.log('QUERY');
//     console.log(realm.objects('Car')[0]);
//   });
// });
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
  url = 'https://thevirustracker.com/free-api?countryTimeline=US';
  data = null;
  async getData() {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    let response = await fetch(this.url, this.requestOptions);
    let json = await response.json();
    return json;
  }
  render() {
    let tableData = [];
    if (this.state.json === null) {
      this.getData().then(json => {
        this.setState({json: json.timelineitems[0]})
        let keys = Object.keys(this.state.json);
        keys.forEach(i => {
          let record = this.state.json[i];
          if (record !== undefined && typeof record === 'object') {
            record.date = i;
            tableData.push(record);
          }
        });
      });
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
