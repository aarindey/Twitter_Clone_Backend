import LikeRepository from "../repository/like-repository.js";
import TweetRepository from "../repository/tweet-repository.js";
import CommentRepository from "../repository/comment-repository.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
    this.commentRepository = new CommentRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    let likeable;
    if (modelType === "Tweet") {
      likeable = await this.tweetRepository.getTweet(modelId);
    } else if (modelType === "Comment") {
      likeable = await this.commentRepository.get(modelId);
    } else {
      console.log("There's some error in the model type.");
    }

    const exists = await this.likeRepository.doesLikeExist({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    console.log("if present, ", exists);
    let likeAdded;
    if (exists) {
      likeable.likes.pull(exists._id);
      await likeable.save();
      this.likeRepository.destroy(exists._id);
      likeAdded = false;
    } else {
      console.log("Like not found");
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();
      likeAdded = true;
    }
    console.log(likeAdded);
    return likeAdded;
  }
}

export default LikeService;
