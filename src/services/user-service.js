import UserRepository from "../repository/user-repository.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signIn(data) {
    try {
      const email = data.email;
      const currentPassword = data.password;
      const user = await this.userRepository.findBy({ email: email });
      console.log(user);
      if (!user) {
        throw {
          message: "No user found.. Sign up required.",
        };
      }
      if (!user.comparePassword(currentPassword)) {
        throw {
          message: "Password Doesn't match. Try again.",
        };
      }
      console.log("User successfully signed in.");
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
