const userService = require("../services/user.service");
const jwtProvider = require("../config/jwtProvider");
const bcrypt = require ("bcrypt");
//define cart Services
const cartService= require("../services/cart.service");

const register = async (req, res) => {
  try {
    // To Create User Through Registration
    const user = await userService.createUser(req.body);
    // create Token For User
    const jwt = jwtProvider.generateToken(user._id);

    //Create Cart,,, Cart is ready when user Registered 

    await cartService.createCart(user);
    return res.status(200).send({ jwt, message:"Register Success" });
  } catch (error) {
    return res.status(500).send({error:error.message})
  }
};

const login = async(req,res)=>{
    //Extract password and email from body
    const {password,email}=req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if(!user){
            return res.status(404).send({message: "User not Found With This Email", email});
        }
        //if user found check password entered by user
        const isPasswordValid = await bcrypt.compare(password,user.password);
        // password check 
        if (!isPasswordValid){
            return res.status(401).send({message: "Invalid Password..."})
        }
        const jwt = jwtProvider.generateToken(user._id)
        return res.status(200).send({jwt,message: "Login Successed"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports ={register,login}
