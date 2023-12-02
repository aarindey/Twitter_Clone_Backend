import TweetRepository from "../repository/tweet-repository.js";
import HashtagRepository from "../repository/hashtag-repository.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    const content = data.content;
    const tags = content
      .match(/#+[a-zA-Z0-9(_)]+/g)
      .map((tag) => tag.substring(1).toLowerCase());
    // storing tweets
    const tweet = await this.tweetRepository.create(data);
    // storing hashtags
    // store only unique ones
    let presentTags = await this.hashtagRepository.findByName(tags);

    let presentTagsText = presentTags.map((tags) => tags.text);
    // newtags = tags - presentTags
    let newTags = tags.filter((tag) => !presentTagsText.includes(tag));

    newTags = newTags.map((tag) => {
      return {
        text: tag,
        tweets: [tweet._id],
      };
    });
    await this.hashtagRepository.bulkCreate(newTags);
    presentTags.forEach((tag) => {
      tag.tweets.push(tweet._id);
      tag.save();
    });
    return tweet;
  }

  async getTweet(tweetId) {
    const tweet = await this.tweetRepository.getTweet(tweetId);
    return tweet;
  }
}

export default TweetService;
