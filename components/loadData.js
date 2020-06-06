class LoadData {
  static url = 'https://thevirustracker.com/free-api?countryTimeline=US';
  static requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  static async getStats() {
    let response = await fetch(this.url, this.requestOptions);
    let text = await response.text();
    return text;
  }
}

export default LoadData;
