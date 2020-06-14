import {Button, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import RealmDB from './realmDB';
import Chart from './Chart';
import FlashMessage from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';

const style = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  myButton: {
    paddingTop: 16,
    paddingLeft: 15,
    height: 60,
    width: 60,
    borderRadius: 120,
    backgroundColor: 'rgb(33,150,243)',
  },
});

function RoundBtn(props) {
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => props.props.navigation.navigate('Detail')}>
      <View style={style.myButton} onPress>
        <Icon
          name="th-list"
          style={style.btnDetail}
          size={30}
          color="rgb(196,234,235)"
        />
      </View>
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
      <View style={{flex: 1}}>
        <FlashMessage position="bottom" />
        <Button
          title={this.state.choosenCountry}
          onPress={() => this.props.navigation.navigate('Country')}
          style={style.btnCountry}
        />

        {/*<Button title="Очистка базы данных" onPress={() => RealmDB.restart()} />*/}
        <Chart navigation={this.props.navigation} />
        <RoundBtn props={this.props} />
      </View>
    );
  }
}

export default Main;
