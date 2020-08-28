'use strict'
const Tweet = use('App/Models/Tweet')
class TweetController {
  async index() {
    const tweets = Tweet.query().setVisible(['content']).with('user').fetch()

    return tweets
  }

  async store({ request, auth }) {
    const data = request.only(['content'])
    const tweet = await Tweet.create({
      user_id: auth.user.id,
      ...data
    })

    return tweet
  }

  async show({ params, request, response, view }) {
    const tweet = await Tweet
      .query()
      .setVisible(['content'])
      .where({
        id: params.id
      })
      .with('user')
      .fetch()

    return tweet
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, auth, response }) {
    const tweet = await Tweet.findOrFail(params.id)

    if (tweet.user_id !== auth.user.id) {
      response.status(401)
    }

    await tweet.destroy()
  }
}

module.exports = TweetController
