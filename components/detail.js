import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';

class Tracker extends Component {
  url =
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-01-02/2020-05-30';

  async getData() {
    try {
      let response = await fetch(this.url);
      let json = await response.json();
      this.setState({json: json.data});
      console.log(json);
    } catch (error) {
      //обработка ошибки
      throw error;
    }
  }

  state = {
    json: null,
  };
  constructor() {
    super();
  }
  componentDidMount(): void {}
  render() {
    this.getData();
    let flatData = [];
    if (this.state.json !== null) {
      let keys = Object.keys(this.state.json);
      keys.forEach(i => {
        let record = this.state.json[i].RUS;
        flatData.push(record);
      });
      console.log(flatData);
    }
    return (
      <View style={style.container}>
        {/*<Button title={'Get covid data'} onPress={() => this.getData()} />*/}
        <FlatList
          data={flatData}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Text>
              {item.date_value} ({item.date_value}) {item.confirmed}
            </Text>
          )}
          keyExtractor={i => i.date_value}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

export default Tracker;
