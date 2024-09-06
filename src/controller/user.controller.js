
const userServices= require("../services/user.service")

//Bearer token
const getUserProfile = async(req,res)=>{
    
    
    try {
        const jwt = req.headers.authorization?.split(" ")[1];
        console.log("req",jwt);
        if(!jwt){
            return res.status(404).send({error:"Token Not Found"})
        }
        const user = await userServices.getUserProfileByToken(jwt)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllUser= async(req,res)=>{
    try {
        const users = await userServices.getAllUser();
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id; // Assuming you're passing the userId as a route parameter
      const deletedUser = await userServices.deleteUserById(userId);
      return res.status(200).send(deletedUser);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

module.exports = {getUserProfile,getAllUser,deleteUser}