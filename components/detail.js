import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';


class Detail extends Component {
  url =
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-01-02/2020-05-30';

  async getData() {
    try {
      let response = await fetch(this.url);
      let json = await response.json();
      this.setState({json: json.data});
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

  render() {
    console.log(this);
    // this.getData();
    let tableData = [];
    if (this.state.json !== null) {
      let keys = Object.keys(this.state.json);
      keys.forEach(i => {
        let record = this.state.json[i].RUS;
        if (record !== undefined) {
          tableData.push(record);
        }
      });
      // console.log(tableData);
    }

    return (
      <View style={style.container}>
        <Button title={'PUK'} onPress={() => this.getData()} />
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={['Date', 'Confirmed', 'Deaths']}
                widthArr={[125, 125, 125]}
                style={style.header}
                textStyle={style.text}
              />
            </Table>
            <ScrollView style={style.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {tableData.reverse().map((rowData, index) => {
                  // console.log(rowData);
                  return (
                    <Row
                      key={index}
                      data={[
                        rowData.date_value,
                        rowData.confirmed,
                        rowData.deaths,
                      ]}
                      widthArr={[125, 125, 125]}
                      style={[
                        style.row,
                        index % 2 && {backgroundColor: '#F7F6E7'},
                      ]}
                      textStyle={style.text}
                    />
                  );
                })}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
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

export default Detail;
