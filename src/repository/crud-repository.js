// This is the parent repository class with the common
// functions that gets inherited
class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      let result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("error in creating a db entry ", error);
      throw error;
    }
  }
  async get(id) {
    try {
      let result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("error in reading a db entry ", error);
      throw error;
    }
  }
  async getAll() {
    try {
      let results = await this.model.find({});
      return results;
    } catch (error) {
      console.log("error in reading all db entry ", error);
      throw error;
    }
  }
  async delete(data) {
    try {
      let result = await this.model.deleteOne(data);
      return result;
    } catch (error) {
      console.log("error in deleting a db entry ", error);
      throw error;
    }
  }
}

export default CrudRepository;
// CRUD operations
