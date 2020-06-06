class realmDB {
  static Realm = require('realm');
  static SCHEMAS = [
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
      },
    },
  ];

  static sendNewDataToBase = function(newData) {
    this.Realm.open({schema: this.SCHEMAS}).then(realm => {
      realm.write(() => {
        realm.create('Data', newData, 'modified');
        realm.create('Country', {id: newData.id}, 'modified');
      });
    });
  };

  static getRecords = async function(name) {
    let ans = [];
    this.Realm.open({schema: this.SCHEMAS}).then(realm =>
      realm.objects(name).map(i => ans.push(i)),
    );
    return ans;
  };
}

export default realmDB;
