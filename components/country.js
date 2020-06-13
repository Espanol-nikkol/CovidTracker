import React, {Component} from 'react';
import {StyleSheet, Button, FlatList} from 'react-native';
import Constant from './const';
import RealmDB from './realmDB';
import SearchBar from 'react-native-search-bar';

class Country extends Component {
  state = {
    data: this.listCountry,
  };

  listCountry = (() =>
    Object.keys(Constant.COUNTRY_TO_ISO).map(i => {
      let temp = {};
      temp.id = Constant.COUNTRY_TO_ISO[i];
      temp.name = i;
      return temp;
    }))();

  onClickCountry = function(id, props) {
    RealmDB.setChoosenCountry(id).then(() => props.navigation.navigate('Main'));
  };

  searchFilterFunction = text => {
    const newData = this.listCountry.filter(item =>
      item.name.toUpperCase().startsWith(text.toUpperCase()),
    );
    this.setState({data: newData});
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Country or region Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    return (
      <FlatList
        onEndReachedThreshold={0.7}
        data={this.state.data}
        renderItem={({item}) => (
          <Button
            title={item.name}
            onPress={() => this.onClickCountry(item.id, this.props)}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
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
