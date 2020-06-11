import {LineChart, PieChart} from 'react-native-chart-kit';
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import RealmDB from './realmDB';
import {showMessage} from 'react-native-flash-message';
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

class Chart extends Component {
  state = {
    json: {},
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
          let tableData = (() =>
            keys.map(i => {
              let temp = {};
            }))();
          console.log(data.data[lastIndex])
          this.setState({
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
                  name: 'Total sick',
                  count: data.data[lastIndex].total_cases -
                      data.data[lastIndex].total_deaths -
                      data.data[lastIndex].total_recoveries,
                  color: 'rgba(10, 103, 163, 1)',
                  legendFontColor: 'rgba(10, 103, 163, 1)',
                  legendFontSize: 15,
                },
                {
                  name: 'Total cases',
                  count: data.data[lastIndex].total_cases,
                  color: 'rgba(255, 142, 0, 1)',
                  legendFontColor: 'rgba(255, 142, 0, 1)',
                  legendFontSize: 15,
                },
                {
                  name: 'Total recoveries',
                  count: data.data[lastIndex].total_recoveries,
                  color: 'rgba(0, 201, 13, 1)',
                  legendFontColor: 'rgba(0, 201, 13, 1)',
                  legendFontSize: 15,
                },
                {
                  name: 'Total deaths',
                  count: data.data[lastIndex].total_deaths,
                  color: 'rgba(255, 7, 0, 1)',
                  legendFontColor: 'rgba(255, 7, 0, 1)',
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
          });
        });
      }
    });
  }

  render() {
    if (RealmDB.choosenCountry) {
      return (
        <View>
          <Text>{this.state.country} </Text>
          <PieChart
            data={this.state.json.count}
            width={400}
            height={220}
            chartConfig={chartConfig}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="10"
            absolute
          />
          <ScrollView horizontal={true}>
            <LineChart
              data={{
                labels: this.state.labels,
                datasets: [
                  {
                    data: this.state.json.total_cases,
                    color: (opacity = 1) => `rgba(255, 142, 0, ${opacity})`,
                  },
                  {
                    data: this.state.json.total_deaths,
                    color: (opacity = 1) => `rgba(255, 7, 0, ${opacity})`,
                  },
                  {
                    data: this.state.json.total_recoveries,
                    color: (opacity = 1) => `rgba(0, 201, 13, ${opacity})`,
                  },
                  {
                    data: this.state.json.total_sick,
                    color: (opacity = 1) => `rgba(10, 103, 163, ${opacity})`,
                  },
                ],
              }}
              width={this.state.labels.length * 70}
              height={220}
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              onDataPointClick={({value, dataset, getColor}) => {
                let index = dataset.data.indexOf(value);
                showMessage({
                  message: `Statistics for ${this.state.labels[index]}`,
                  description: `Total cases: ${
                    this.state.json.total_cases[index]
                  },
Total deaths: ${this.state.json.total_deaths[index]},
Total recoveries: ${this.state.json.total_recoveries[index]},
Total sick: ${this.state.json.total_sick[index]}`,
                  type: 'info',
                  autoHide: false,
                });
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </ScrollView>
        </View>
      );
    } else {
      return <Text>{this.state.country} </Text>;
    }
  }
}

export default Chart;
