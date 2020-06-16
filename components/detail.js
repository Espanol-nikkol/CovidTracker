import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';
import RealmDB from './realmDB';
import Icon from 'react-native-vector-icons/FontAwesome';

function RoundBtn(props) {
  return (
    <TouchableOpacity
      style={style.myButton}
      onPress={() => props.props.navigation.navigate('Main')}>
      <Icon name="reply" size={30} color="rgb(196,234,235)" />
    </TouchableOpacity>
  );
}

class Detail extends Component {
  state = {
    json: null,
  };
  tableData = [];
  componentDidMount(): void {
    this.props.navigation.addListener('focus', () => {
      if (RealmDB.choosenCountry) {
        RealmDB.getCurrentData().then(res => {
          let data = JSON.parse(res);
          let keys = Object.keys(data.data);
          this.tableData = (() => keys.map(i => data.data[i]))();
          this.setState({
            country: data.title,
            json: data.data,
          });
        });
      }
    });
  }
  render() {
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
        <RoundBtn props={this.props} />
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
  containerBtn: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  myButton: {
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    height: 60,
    width: 60,
    borderRadius: 120,
    backgroundColor: 'rgb(33,150,243)',
  },
});

export default Detail;
