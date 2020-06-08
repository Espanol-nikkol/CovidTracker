import React, {Component} from 'react';
import {StyleSheet, Button, FlatList} from 'react-native';

class Country extends Component {
  countries = [
    {'Primorsky Krai': 'Primorsky Krai'},
    {Afghanistan: 'AF'},
    {Albania: 'AL'},
    {Algeria: 'DZ'},
    {Angola: 'AO'},
    {Argentina: 'AR'},
    {Armenia: 'AM'},
    {Australia: 'AU'},
    {Austria: 'AT'},
    {Azerbaijan: 'AZ'},
    {Bahamas: 'BS'},
    {Bangladesh: 'BD'},
    {Belarus: 'BY'},
    {Belgium: 'BE'},
    {Belize: 'BZ'},
    {Benin: 'BJ'},
    {Bhutan: 'BT'},
    {Bolivia: 'BO'},
    {'Bosnia and Herzegovina': 'BA'},
    {Botswana: 'BW'},
    {Brazil: 'BR'},
    {'Brunei Darussalam': 'BN'},
    {Bulgaria: 'BG'},
    {'Burkina Faso': 'BF'},
    {Burundi: 'BI'},
    {Cambodia: 'KH'},
    {Cameroon: 'CM'},
    {Canada: 'CA'},
    {'Central African Republic': 'CF'},
    {Chad: 'TD'},
    {Chile: 'CL'},
    {China: 'CN'},
    {Colombia: 'CO'},
    {Congo: 'CG'},
    {'Congo}, The Democratic Republic of the': 'CD'},
    {'Costa Rica': 'CR'},
    {'Ivory Coast': 'CI'},
    {Croatia: 'HR'},
    {Cuba: 'CU'},
    {Cyprus: 'CY'},
    {Czechia: 'CZ'},
    {Denmark: 'DK'},
    {'Diamond Princess': 'DP'},
    {Djibouti: 'DJ'},
    {'Dominican Republic': 'DO'},
    {Ecuador: 'EC'},
    {Egypt: 'EG'},
    {'El Salvador': 'SV'},
    {'Equatorial Guinea': 'GQ'},
    {Eritrea: 'ER'},
    {Estonia: 'EE'},
    {Ethiopia: 'ET'},
    {'Falkland Islands (Malvinas)': 'FK'},
    {'Faroe Islands': 'FO'},
    {Fiji: 'FJ'},
    {Finland: 'FI'},
    {France: 'FR'},
    {'French Guiana': 'GF'},
    {'French Southern Territories': 'TF'},
    {Gabon: 'GA'},
    {Gambia: 'GM'},
    {Georgia: 'GE'},
    {Germany: 'DE'},
    {Ghana: 'GH'},
    {Greece: 'GR'},
    {Greenland: 'GL'},
    {Grenada: 'GD'},
    {Guatemala: 'GT'},
    {Guinea: 'GN'},
    {'Guinea-Bissau': 'GW'},
    {Guyana: 'GY'},
    {Haiti: 'HT'},
    {Honduras: 'HN'},
    {'Hong Kong': 'HK'},
    {Hungary: 'HU'},
    {Iceland: 'IS'},
    {India: 'IN'},
    {Indonesia: 'ID'},
    {Iran: 'IR'},
    {Iraq: 'IQ'},
    {Ireland: 'IE'},
    {Israel: 'IL'},
    {Italy: 'IT'},
    {Jamaica: 'JM'},
    {Japan: 'JP'},
    {Jordan: 'JO'},
    {Kazakhstan: 'KZ'},
    {Kenya: 'KE'},
    {Kosovo: 'XK'},
    {Kuwait: 'KW'},
    {Kyrgyzstan: 'KG'},
    {Lao: 'LA'},
    {Latvia: 'LV'},
    {Lebanon: 'LB'},
    {Lesotho: 'LS'},
    {Liberia: 'LR'},
    {Libya: 'LY'},
    {Lithuania: 'LT'},
    {Luxembourg: 'LU'},
    {Macedonia: 'MK'},
    {Madagascar: 'MG'},
    {Malawi: 'MW'},
    {Malaysia: 'MY'},
    {Mali: 'ML'},
    {Mauritania: 'MR'},
    {Mexico: 'MX'},
    {Moldova: 'MD'},
    {Mongolia: 'MN'},
    {Montenegro: 'ME'},
    {Morocco: 'MA'},
    {Mozambique: 'MZ'},
    {Myanmar: 'MM'},
    {Namibia: 'NA'},
    {Nepal: 'NP'},
    {Netherlands: 'NL'},
    {'New Caledonia': 'NC'},
    {'New Zealand': 'NZ'},
    {Nicaragua: 'NI'},
    {Niger: 'NE'},
    {Nigeria: 'NG'},
    {'North Korea': 'KP'},
    {Norway: 'NO'},
    {Oman: 'OM'},
    {Pakistan: 'PK'},
    {Palestine: 'PS'},
    {Panama: 'PA'},
    {'Papua New Guinea': 'PG'},
    {Paraguay: 'PY'},
    {Peru: 'PE'},
    {Philippines: 'PH'},
    {Poland: 'PL'},
    {Portugal: 'PT'},
    {'Puerto Rico': 'PR'},
    {Qatar: 'QA'},
    {Romania: 'RO'},
    {'Russian Federation': 'RU'},
    {Rwanda: 'RW'},
    {'Saudi Arabia': 'SA'},
    {Senegal: 'SN'},
    {Serbia: 'CS'},
    {'Sierra Leone': 'SL'},
    {Singapore: 'SG'},
    {Slovakia: 'SK'},
    {Slovenia: 'SI'},
    {'Solomon Islands': 'SB'},
    {Somalia: 'SO'},
    {'South Africa': 'ZA'},
    {Spain: 'ES'},
    {'Sri Lanka': 'LK'},
    {Sudan: 'SD'},
    {Suriname: 'SR'},
    {'Svalbard and Jan Mayen': 'SJ'},
    {Swaziland: 'SZ'},
    {Sweden: 'SE'},
    {Switzerland: 'CH'},
    {'Syrian Arab Republic': 'SY'},
    {Taiwan: 'TW'},
    {Tajikistan: 'TJ'},
    {Tanzania: 'TZ'},
    {Thailand: 'TH'},
    {'Timor-Leste': 'TL'},
    {Togo: 'TG'},
    {'Trinidad and Tobago': 'TT'},
    {Tunisia: 'TN'},
    {Turkey: 'TR'},
    {Turkmenistan: 'TM'},
    {Uganda: 'UG'},
    {Ukraine: 'UA'},
    {'United Arab Emirates': 'AE'},
    {'United Kingdom': 'GB'},
    {'United States': 'US'},
    {Uruguay: 'UY'},
    {Uzbekistan: 'UZ'},
    {Vanuatu: 'VU'},
    {Venezuela: 'VE'},
    {Vietnam: 'VN'},
    {'Western Sahara': 'EH'},
    {Yemen: 'YE'},
    {Zambia: 'ZM'},
    {Zimbabwe: 'ZW'},
  ];

  onClickCountry = function(id) {

  };

  render() {
    return (
      <FlatList
        onEndReachedThreshold={0.7}
        data={this.countries}
        renderItem={({item}) => (
          <Button
            title={Object.keys(item)[0]}
            onPress={evt => this.onClickCountry(item[Object.keys(item)[0]])}
          />
        )}
        keyExtractor={item => item[Object.keys(item)[0]]}
      />
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

export default Country;
