const {Thoughts, User} = require('../models');

// Create a new thought.
const createThought = async(req,res) => {
    try {
        let newThought = await Thoughts.create(req.body);
        let updatedUser = await User.findOneAndUpdate(
            {
                username: req.body.username,
            },
            {
                $push: { thoughts: newThought._id },
            },
            {
                new: true,
            }
        );
        if(!updatedUser) {
            res.status(404).json({message:'Thought created but no user found with this Id!'});
        }
        res.status(200).json(newThought);

    } catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
};

// Update single thought by it's _id
const updateThought = async (req,res) => {
    try{
        let thoughtData = await Thoughts.findOneAndUpdate(
            { 
                _id: req.params.thoughtId 
            },
            { 
                $set: req.body 
            },
            { 
                runValidators: true, 
                new: true 
            }
          );
          if (!thoughtData) {
            return res.status(404).json({ message: "No thought with this id!" });
          }
          res.status(200).json(thoughtData);
        
    } catch(error) {
        res.status(500).json(error);
    }
}

// Delete single thought by its _id.
const deleteThought = async (req,res) => {
    try {
        let thoughtData = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });
        let updatedUser = await User.findOneAndUpdate(
            { 
                thoughts: req.params.thoughtId 
            },
            {
                 $pull: { thoughts: req.params.thoughtId } 
            },
            { 
                new: true 
            }
          );
          if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
          }
          if (!updatedUser) {
            res.status(404).json({message: 'Thought delete successfully. but no user found with this thought!'})
          }
          res.status(200).json({message: 'Thought deleted successfully and removed from user thoughts'});
    }catch (error) {
        res.status(500).json(error);
    }
};

// Fetch all of the thoughts.
const getThoughts = async(req,res) => {
    try{
        let thoughtData = await Thoughts.find()
        .sort(
            { createdAt: -1 }
            )
        
          res.json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};

// Get single thought by it's _id
const getSingleThought = async (req,res) => {
    try {
        let thoughtData = await Thoughts.findOne({_id:req.params.thoughtId});
        if(!thoughtData) {
            res.status(404).json({message: 'No thoughts found for this Id!'});
        }
        res.status(200).json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};

// Add a reaction to the thought.
const addReaction = async(req,res) => {
    try {
        // Find the thought by _id and update.
        let thoughtData = await Thoughts.findOneAndUpdate(
            { 
                _id: req.params.thoughtId 
            },
            { 
                $addToSet: { reactions: req.body } 
            },
            { 
                runValidators: true, 
                new: true 
            }
          );
          if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
          }
          res.json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};

// Delete a reaction on a thought
const removeReaction = async(req,res) => {
    try {
        // Find the thought with thoughtId.
        let thoughtData = await Thoughts.findOneAndUpdate(
            { 
                _id: req.params.thoughtId 
            },
            { 
                // Remove reaction identified by reactionId.
                $pull: { reactions: { reactionId: req.params.reactionId } } 
            },
            { 
                runValidators: true, 
                new: true 
            }
          );
          if (!thoughtData) {
            res.status(404).json({ message: "No thought found with this id!" });
          }
          res.json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};


// exporting thoughts methods
module.exports = {createThought, updateThought,deleteThought, getThoughts, getSingleThought, addReaction, removeReaction};
