import Constant from './const';

class LoadData {
  static url = 'https://thevirustracker.com/free-api?countryTimeline=';
  static requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  static async getStats(country) {
    let response = '';
    if (country === 'Primorsky Krai') {
      response = await fetch(
        'https://raw.githubusercontent.com/Barrowland/covid-19-statistics-Primorsky-Krai/master/stat-covid-19-prim.json',
      );
    } else {
      response = await fetch(this.url + country, this.requestOptions);
    }
    // console.log(response)
    let text = await response.text();
    // console.log(text)
    return text;
  }
}

export default LoadData;
