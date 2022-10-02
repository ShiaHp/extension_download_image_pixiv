// const { TwitterApi } = require('twitter-api-v2') 
// const client = new TwitterApi({
//   appKey: 'WrysGmNfdG8jRGhGn66yOq6e5',
//   appSecret: 'p7nJaDzalZW5lgGSu4fcMy78emviS0ksVHrBvFM5LBXhvkwwYV',
//   accessToken: '1124540314738237445-EzHsVRkB99OyQtDLfm40bFE44l2IBI',
//   accessSecret: 'u2sudob9F7jjXKvcLk4m2GQnpSF0Zf3zoBFSFMjSFohmy',
// });
//  async function getTimeLineUser(idTweet) {
//   const infoTweet = await client.v2.tweets(idTweet,{
//     expansions: ['attachments.media_keys', 'attachments.poll_ids', 'referenced_tweets.id'],'media.fields':['url']
//   })
//   console.log(infoTweet)
//   console.log(infoTweet.includes.media[0].url)
//   return infoTweet.includes.media[0].url
// }

// module.exports = {getTimeLineUser}