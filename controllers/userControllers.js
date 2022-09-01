const {Users, Thoughts} =  require('../models');

const createUser = async(req,res) => {
    try{
        let userData = await Users.create(req.body);
        res.status(200).json(userData);
    } catch(error) {
        res.status(500).json({error});
    }
};

const updateUser = async(req,res) => {
    try {
        let userData = await Users.findOneAndUpdate(
            { 
                _id: req.params.userId 
            },
            {
              $set: req.body,
            },
            {
              runValidators: true,
              new: true,
            }
          );
          if (!userData) { 
            return res.status(404).json({ message: "No user with this id!" });
          }
          res.status(200).json(userData);
          
    } catch(error) {
        res.status(500).json({error});
    }
};





module.exports = {createUser, updateUser,deleteUser, getUsers, getSingleUser, addFriend, removeFriend};

    
   

    