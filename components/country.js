import React, {Component} from 'react';
import {StyleSheet, Button, FlatList} from 'react-native';
import Constant from './const';
import RealmDB from './realmDB';

class Country extends Component {
  listCountry = (() =>
    Object.keys(Constant.COUNTRY_TO_ISO).map(i => {
      let temp = {};
      temp[i] = Constant.COUNTRY_TO_ISO[i];
      return temp;
    }))();

  onClickCountry = function(id, props) {
    RealmDB.setChoosenCountry(id).then(() => props.navigation.navigate('Main'));
  };



  render() {
    return (
      <FlatList
        onEndReachedThreshold={0.7}
        data={this.listCountry}
        renderItem={({item}) => (
          <Button
            title={Object.keys(item)[0]}
            onPress={() =>
              this.onClickCountry(item[Object.keys(item)[0]], this.props)
            }
          />
        )}
        keyExtractor={item => item[Object.keys(item)[0]]}
      />
    );
  }
}

const style = StyleSheet.create({
  container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
});

export default Country;
