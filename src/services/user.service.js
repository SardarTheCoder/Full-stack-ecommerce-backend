const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    // check multiple User while login
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      throw new Error("user Already Exist With Email");
    }
    //Protect password
    password = await bcrypt.hash(password, 8);
    //Create User
    const user = await User.create({ firstName, lastName, email, password });
    console.log("Create User", user);
    return user;
  } catch (error) {
    //Throw Error with Code
    throw new Error(error.message);
  }
};

//Find User By Id
const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    // .populate("address");
    if (!user) {
      throw new Error("User Not Found With Id :", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//Find User By email
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User Not Found With Email: " + email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Get user From Token
const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await findUserById(userId);
    if (!user) {
      throw new Error("User Not Found With Id :", userId);
    }
    console.log("user",user);
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUser = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserById = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User Not Found With Id:", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUser,
  deleteUserById
};
