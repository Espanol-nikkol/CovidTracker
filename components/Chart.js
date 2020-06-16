import {LineChart, PieChart} from 'react-native-chart-kit';
import React, {Component} from 'react';
import {ScrollView, Text, View, Dimensions, StyleSheet} from 'react-native';
import RealmDB from './realmDB';
import {showMessage, hideMessage} from 'react-native-flash-message';

class Chart extends Component {
  state = {
    json: {
      total_sick: [],
      total_deaths: [],
      total_cases: [],
      total_recoveries: [],
      count: [{name: '', count: 0}],
    },
    country: 'Please, choose country',
    labels: [],
  };
  componentDidMount(): void {
    this.props.navigation.addListener('focus', () => {
      if (RealmDB.choosenCountry) {
        RealmDB.getCurrentData().then(res => {
          let data = JSON.parse(res);
          let keys = Object.keys(data.data);
          let lastIndex = keys[keys.length - 1];
          RealmDB.isDownloading = false;
          let newState = {
            choosenCountry: RealmDB.choosenCountry,
            country: data.title,
            json: {
              total_sick: keys
                .map(
                  i =>
                    data.data[i].total_cases -
                    data.data[i].total_deaths -
                    data.data[i].total_recoveries,
                )
                .reverse(),
              total_deaths: keys.map(i => data.data[i].total_deaths).reverse(),
              total_cases: keys.map(i => data.data[i].total_cases).reverse(),
              total_recoveries: keys
                .map(i => data.data[i].total_recoveries)
                .reverse(),
              count: [
                {
                  name: 'Sick',
                  count:
                    data.data[lastIndex].total_cases -
                    data.data[lastIndex].total_deaths -
                    data.data[lastIndex].total_recoveries,
                  color: '#4A11AE',
                  legendFontColor: '#4A11AE',
                  legendFontSize: 15,
                },
                {
                  name: 'Recoveries',
                  count: data.data[lastIndex].total_recoveries,
                  color: '#00B64F',
                  legendFontColor: '#00B64F',
                  legendFontSize: 15,
                },
                {
                  name: 'Deaths',
                  count: data.data[lastIndex].total_deaths,
                  color: '#FF3500',
                  legendFontColor: '#FF3500',
                  legendFontSize: 15,
                },
              ],
            },
            labels: keys
              .map(i =>
                new Date(i).toLocaleString(
                  'ru-ru',
                  RealmDB.OPTION_DATEFORMAT_SHORT,
                ),
              )
              .reverse(),
          };
          this.setState(newState);
        });
      }
    });
    this.props.navigation.addListener('blur', () => hideMessage());
  }

  render() {
    if (this.state.choosenCountry) {
      return (
        <View>
          <Text style={style.totalCasesText}>
            Total cases: {this.state.json.total_cases[0]}
          </Text>
          <PieChart
            data={this.state.json.count}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            absolute
          />
          <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    data: this.state.json.total_cases,
                    color: (opacity = 1) => `rgba(255, 139, 0,${opacity})`,
                  },
                  {
                    data: this.state.json.total_deaths,
                    color: (opacity = 1) => `rgba(255, 53, 0,${opacity})`,
                  },
                  {
                    data: this.state.json.total_recoveries,
                    color: (opacity = 1) => `rgba(0, 182, 79,${opacity})`,
                  },
                  {
                    data: this.state.json.total_sick,
                    color: (opacity = 1) => `rgba(74, 17, 174,${opacity})`,
                  },
                ],
              }}
              withShadow={false}
              width={this.state.labels.length * 70}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundGradientFrom: 'rgba(175, 217, 219, 1)',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 25,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '1',
                  stroke: '#000000',
                },
              }}
              onDataPointClick={({value, dataset}) => {
                let index = dataset.data.indexOf(value);
                showMessage({
                  message: `Statistics for ${this.state.labels[index]}`,

                  description: `Total cases: ${
                    this.state.json.total_cases[index]
                  },
Total sick: ${this.state.json.total_sick[index]},
Total recoveries: ${this.state.json.total_recoveries[index]},
Total deaths: ${this.state.json.total_deaths[index]}`,
                  type: 'info',
                  autoHide: false,
                  textStyle: {letterSpacing: 1, color: '#000000'},
                  titleStyle: {color: '#000000', fontSize: 19},
                });
              }}
              bezier
              style={style.lineChart}
            />
          </ScrollView>
        </View>
      );
    } else {
      return <Text style={style.undefindedText}>Please, choose country</Text>;
    }
  }
}

const style = StyleSheet.create({
  totalCasesText: {
    color: 'rgba(255, 139, 0, 1)',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  undefindedText: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: 10,
  },
  lineChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default Chart;
