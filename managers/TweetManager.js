const BaseManager = require('./BaseManager')
const Tweet = require('../structures/Tweet')
const { tweetBuilder } = require('../util/StructureBuilder')

class TweetManager extends BaseManager {
    constructor(client){
        super(client, Tweet);

        this.tweetBuilder = tweetBuilder
    }

    async fetch(options) {
        if(!options) throw new Error('Tweet Invalid')
        const tweetID = options
        if(tweetID) {
            const tweetData = await this._fetchSingle(options)
            const tweet = tweetBuilder(this.client, tweetData)
            this.cache.set(tweet.id, tweet)
            return tweet
        }
    }

    async _fetchSingle(q) {
        return this.client.api.tweets(q).get({ version: '2' })
    }
}

module.exports = TweetManager