import Hashtag from "../models/hashtag.js";
import CrudRepository from "./crud-repository.js";

class HashtagRepository extends CrudRepository {
  constructor() {
    super(Hashtag);
  }
  async bulkCreate(data) {
    try {
      const tags = await Hashtag.insertMany(data);
      return tags;
    } catch (error) {
      console.log("Error occured while bulk creating.", error);
    }
  }
  async getAllHashtags() {
    try {
      let hashtags = await Hashtag.find({});
      return hashtags;
    } catch (error) {
      console.log("error in reading all db entry ", error);
      throw error;
    }
  }
  // Get By Name
  async findByName(text) {
    try {
      let hashtag = await Hashtag.find({ text: text });
      return hashtag;
    } catch (error) {
      console.log("Error occured while getting a hashtag by name.", error);
    }
  }
  async getHashtag(id) {
    try {
      let hashtag = await Hashtag.findById(id);
      return hashtag;
    } catch (error) {
      console.log("error in reading a db entry ", error);
      throw error;
    }
  }
  async deleteHashtag(data) {
    try {
      let hashtag = await Tweet.deleteOne(data);
      return hahstag;
    } catch (error) {
      console.log("error in deleting a db entry ", error);
      throw error;
    }
  }
}

export default HashtagRepository;
// CRUD operations
