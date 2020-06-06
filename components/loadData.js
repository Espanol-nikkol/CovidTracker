class LoadData {
  static url = 'https://thevirustracker.com/free-api?countryTimeline=';
  static requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  static async getStats(country) {
    let response = await fetch(this.url + country, this.requestOptions);
    let text = await response.text();
    return text;
  }
}

export default LoadData;
