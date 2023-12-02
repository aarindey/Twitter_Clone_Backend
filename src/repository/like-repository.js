import CrudRepository from "./crud-repository.js";
import Like from "../models/like.js";

class LikeRepository extends CrudRepository {
  constructor() {
    super(Like);
  }

  async doesLikeExist(data) {
    try {
      const like = Like.findOne(data);
      return like;
    } catch (error) {
      throw error;
    }
  }
}

export default LikeRepository;
