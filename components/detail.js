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
import RealmDB from './realmDB';

class Detail extends Component {
  state = {
    json: null,
  };
  tableData = [];
  render() {
    if (this.state.json === null) {
      RealmDB.getRecords('Data').then(res => {
        const json = JSON.parse(res[0].data).timelineitems[0];
        let keys = Object.keys(json);
        keys.forEach(i => {
          let record = json[i];
          if (typeof record === 'object') {
            record.date = i;
            this.tableData.push(record);
          }
        });
        this.setState({json: json});
      });
    }
    return (
      <View style={style.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={['Date', 'New Cases', 'New Deaths']}
                widthArr={[125, 125, 125]}
                style={style.header}
                textStyle={style.text}
              />
            </Table>
            <ScrollView style={style.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {this.tableData.reverse().map((rowData, index) => {
                  // console.log(rowData);
                  return (
                    <Row
                      key={index}
                      data={[
                        rowData.date,
                        rowData.new_daily_cases,
                        rowData.new_daily_deaths,
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
