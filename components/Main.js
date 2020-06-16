import {Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import RealmDB from './realmDB';
import Chart from './Chart';
import FlashMessage from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';

function RoundBtn(props) {
  return (
    <TouchableOpacity
      style={style.myButton}
      onPress={() => props.props.navigation.navigate('Detail')}>
      <Icon name="th-list" size={30} color="rgb(196,234,235)" />
    </TouchableOpacity>
  );
}

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
      <View style={style.screenMain}>
        <FlashMessage position="bottom" />
        <Button
          title={this.state.choosenCountry}
          onPress={() => this.props.navigation.navigate('Country')}
        />
        {/*<Button title="Очистка базы данных" onPress={() => RealmDB.restart()} />*/}
        <Chart navigation={this.props.navigation} />
        <RoundBtn props={this.props} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  myButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    borderRadius: 120,
    backgroundColor: 'rgb(13,130,223)',
  },
  screenMain: {flex: 1},
});

export default Main;
