const BaseStructure = require('./BaseStructure')

class Tweet extends BaseStructure {

  constructor(client, data) {
    super(client);

  
    this.id = data.id;

    this.text = data.text;
  }
}

module.exports = Tweet;
