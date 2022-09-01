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

const deleteUser = async(req,res) => {
    try {
        let userData = await Users.findOneAndDelete(
            {
                 _id: req.params.userId 
            });

        if(!userData){
            res.status(404).json({ message: "No User find with this ID!" })
        }

        let userThought = await Thoughts.deleteMany({ _id: { $in: userData.thoughts } });
        res.json({message: "user has been successfully deleted!"});

    } catch {
        res.status(500).json({error});
    }
};

const getUsers = async(req,res) => {
    try {
        let userData = await Users.findOne(
            { 
                _id: req.params.userId 
            })
        .select("-__v")
        .populate("friends")
        .populate("thoughts")

        if (!userData) {
            res.status(404).json({ message: "No User find with this ID!" })
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error});
    }
};

const getSingleUser = async(req,res) => {
    try {
        let userData = await Users.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("friends")
        .populate("thoughts")
        if (!userData) {
            return res.status(404).json({ message: "No user with this id!" });
          }
          res.status(200).json(userData);
    } catch(error) {
        res.status(500).json({error});
    }
};

const addFriend = async (req,res) => {
    try{
        let userData = Users.findOneAndUpdate(
            { 
                _id: req.params.userId 
            },
            { 
                $addToSet: { friends: req.params.friendId } 
            },
            { 
                new: true 
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

const removeFriend = async(req,res) => {
    try{
        let userData = await Users.findOneAndUpdate(
            { 
                _id: req.params.userId 
            },
            { 
                $pull: { friends: req.params.friendId } 
            },
            { 
                new: true 
            }
          )
              if (!userData) {
                return res.status(404).json({ message: "No user with this id!" });
              }
        res.status(200).json(userData);
    } catch(error) {
        res.status(500).json({error});
    }  
    
};



module.exports = {createUser, updateUser,deleteUser, getUsers, getSingleUser, addFriend, removeFriend};

    
   

    