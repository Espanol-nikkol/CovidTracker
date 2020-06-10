import Constant from './const';
import LoadData from './loadData';

class RealmDB {
  static Realm = require('realm');

  static CONFIG = {
    schema: [
      {
        name: 'Data',
        primaryKey: 'id',
        properties: {
          id: 'string',
          data: 'string',
        },
      },
      {
        name: 'Country',
        primaryKey: 'id',
        properties: {
          id: 'string',
          name: 'string',
        },
      },
    ],
  };
  static choosenCountry;

  static OPTION_DATEFORMAT = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  static sendNewDataToBase = function(newData) {
    this.Realm.open(this.CONFIG).then(realm => {
      realm.write(() => {
        realm.create('Data', newData, 'modified');
        realm.create(
          'Country',
          {id: newData.id, name: Constant.ISO_TO_COUNTRY[newData.id]},
          'modified',
        );
      });
    });
  };

  static getRecords = async function(name) {
    let ans = [];
    this.Realm.open(this.CONFIG).then(realm =>
      realm.objects(name).map(i => {
        ans.push(i);
      }),
    );
    return ans;
  };

  static conversionData = function(id, json) {
    let formatData = {};
    let date, oldDate;
    formatData.title =
      id === 'Primorsky Krai'
        ? 'Primorsky Krai'
        : json.countrytimelinedata[0].info.title;
    formatData.data = {};
    if (id === 'Primorsky Krai') {
      for (let i = 0; i < json.date_value.length; i++) {
        date = new Date(json.date_value[i]).toLocaleString(
          'en-US',
          this.OPTION_DATEFORMAT,
        );
        formatData.data[date] = {};
        formatData.data[date].new_daily_cases =
          i === 0
            ? json.confirmed[i]
            : json.confirmed[i] - json.confirmed[i - 1];
        formatData.data[date].new_daily_deaths =
          i === 0
            ? json.mortality[i]
            : json.mortality[i] - json.mortality[i - 1];
        formatData.data[date].total_cases = json.confirmed[i];
        formatData.data[date].total_recoveries = json.recovered[i];
        formatData.data[date].total_deaths = json.mortality[i];
        formatData.data[date].date = date;
      }
    } else {
      let dates = Object.keys(json.timelineitems[0]);
      let keys = Object.keys(json.timelineitems[0][dates[0]]);
      for (let i = 0; i < dates.length - 1; i++) {
        oldDate = dates[i];
        date = new Date(oldDate).toLocaleString(
          'en-US',
          this.OPTION_DATEFORMAT,
        );
        formatData.data[date] = {};
        keys.forEach(i => {
          formatData.data[date][i] = json.timelineitems[0][oldDate][i];
        })
        formatData.data[date].date = date;
      }
    }
    return formatData;
  };

  static async setChoosenCountry(id) {
    let countries = await this.getRecords('Country');
    if (!countries.find(i => i.name === Constant.ISO_TO_COUNTRY[id])) {
      let data = await LoadData.getStats(id);
      let json = this.conversionData(id, JSON.parse(data));
      this.sendNewDataToBase({id: id, data: JSON.stringify(json)});
    }
    this.choosenCountry = Constant.ISO_TO_COUNTRY[id];
  }

  static async getCurrentData() {
    console.log('getCurrentData start')
    let realm = await this.Realm.open(this.CONFIG);
    console.log(await this.getRecords('Data'));
    return realm
      .objects('Data')
      .filter(i => i.id === Constant.COUNTRY_TO_ISO[this.choosenCountry])[0]
      .data;
  }

  static async restart() {
    let realm = await this.Realm.open(this.CONFIG);
    realm.beginTransaction();
    realm.deleteAll();
    realm.commitTransaction();
  }
}

export default RealmDB;
