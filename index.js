const express = require('express')
const config = require('./config')

const Client = require('./client/Client')
const client = new Client()

const app = express()
app.use(express.json())
const port = 666

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

client.on('ready', client => console.log('Ready!'))


const tweet = async (req, res) => {
    const { text } = req.query
    if(!text) return res.json({ error: 'No text provided'})
    const response = await client.tweet(text)
    res.json(response)
}

const getTweet = async(req, res) => {
    const { id } = req.params
    if(!id) return res.json({ error: 'No ID provided!' })
    const response = await client.tweets.fetch(id)
    res.json(response)
}

app.route('/tweet')
    .get(tweet)

app.route('/tweets/:id')
    .get(getTweet)

client.init(config.keyring.twitter)