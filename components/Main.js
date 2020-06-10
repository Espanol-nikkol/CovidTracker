import {Button, Text, View} from 'react-native';
import React, {Component} from 'react';
import RealmDB from './realmDB';

class Main extends Component {
  state = {
    json: null,
    country: 'Please, choose country',
  };
  componentDidMount(): void {
    this.props.navigation.addListener('focus', () => {
      if (RealmDB.choosenCountry) {
        RealmDB.getCurrentData().then(res => {
          let data = JSON.parse(res);
          let keys = Object.keys(data.data);
          let tableData = (() => keys.map(i => data.data[i]))();
          this.setState({
            country: data.title,
            json: data.data,
          });
        });
      }
    });
  }

  render() {
    // console.log('RENDER MAIN');
    return (
      <View>
        <Text>{this.state.country}</Text>
        <Button
          title="Меню"
          onPress={() => this.props.navigation.openDrawer()}
        />
        <Button title="Сброс" onPress={() => RealmDB.restart()} />
      </View>
    );
  }
}

export default Main;
