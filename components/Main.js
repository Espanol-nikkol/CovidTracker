import {Button, Text, View} from 'react-native';
import React, {Component} from 'react';
import RealmDB from './realmDB';
import Chart from './Chart';
import FlashMessage from 'react-native-flash-message';

class Main extends Component {
  state = {
    choosenCountry: 'Click to choose country',
  };

  componentDidMount(): void {
    this.props.navigation.addListener('focus', () => {
      if (
        this.state.choosenCountry !== RealmDB.choosenCountry &&
        RealmDB.choosenCountry
      ) {
        this.setState({choosenCountry: RealmDB.choosenCountry});
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlashMessage position="bottom" />
        <Button
          title={this.state.choosenCountry}
          onPress={() => this.props.navigation.navigate('Country')}
        />
        <Button title="Очистка базы данных" onPress={() => RealmDB.restart()} />
        <Chart navigation={this.props.navigation} />
      </View>
    );
  }
}

export default Main;
