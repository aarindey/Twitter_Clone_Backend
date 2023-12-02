import express from "express";
import { connect } from "./config/database.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000, async () => {
  console.log("Listening at port 3000");
  //extablishing mongodb connection
  connect().then(() => {
    console.log("MongoDB is connected!!!");
  });

  // const tweet = await Tweet.create({
  //   content: "This is my first Tweet aaaaa",
  //   likes: 1,
  //   numberOfRetweets: 2,
  //   comment: "65655b1037a6746af84fd061",
  // });

  // const hashtag = await Hashtag.create({
  //   text: "sadf",
  //   tweets: [tweet._id],
  // });

  // const tweetRepo = new TweetRepository();

  // let tweets = await tweetRepo.getAllTweets();
  // let tweet = await tweetRepo.getTweet('65655be2d53f246c421a45e3');
  // let tweet = await tweetRepo.deleteTweet({
  //   _id: "65655aa70a7d83da458a4286",
  // });
  //  console.log(tweet);
});
