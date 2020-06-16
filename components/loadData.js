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
    let text = await response.text();
    return text;
  }
}

export default LoadData;
