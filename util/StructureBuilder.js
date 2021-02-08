const Tweet = require('../structures/Tweet');
const { Collection } = require('./export')

function _patchTweet(client, element) {
    const tweet = new Tweet(client, element.data || element)
    return tweet
}

function tweetBuilder(client, tweetData) {
    if (tweetData instanceof Collection) {
        const tweetCollection = new Collection();
        tweetData.forEach(e => {
            tweetCollection.set(e.data.id, _patchTweet(client, e))
        })
        return tweetCollection
    } else {
        return _patchTweet(client, tweetData)
    }
}

module.exports = { tweetBuilder }