const {User, Thoughts} =  require('../models');


const createUser = async(req,res) => {
    try{
        let userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch(error) {
        res.status(500).json({error});
    }
};


const updateUser = async(req,res) => {
    try {
        let userData = await User.findOneAndUpdate(
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

// Delete one user by their _id
const deleteUser = async(req,res) => {
    try {
        let userData = await User.findOneAndDelete(
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

// get all of the users
const getUsers = async(req,res) => {
    try {
        let userData = await User.find()
        .select("-__v")
        // Fill objects for friends and thoughts.
        .populate("friends")
        .populate("thoughts")

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({error});
    }
};

// Find a single user by their _id.
const getSingleUser = async(req,res) => {
    try {
        // Find the user by userId param.
        let userData = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        // Fill objects for friends and thoughts.
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

// adding the friend  for the user
const addFriend = async (req,res) => {
    try{
        // Find the user by userId param and add the friendId to list of friends.
        let userData = await User.findOneAndUpdate(
            { 
                _id: req.params.userId 
            },
            { 
                $addToSet: { friends: req.params.friendId } 
            },
            { 
                new: true 
            }
          )
          // Populate friends and thoughts.
          .populate("friends")
          .populate("thoughts");
              if (!userData) {
                return res.status(404).json({ message: "No user with this id!" });
              }
              res.status(200).json(userData);
    } catch(error) {
        console.log(error);
        res.status(500).json({error});
    }
};

// deleting the user friend from the user friends list
const removeFriend = async(req,res) => {
    try{
        // Find the user by userId param and remove the friendId from list of friends.
        let userData = await User.findOneAndUpdate(
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


// exports user methods
module.exports = {createUser, updateUser,deleteUser, getUsers, getSingleUser, addFriend, removeFriend};

    
   

    