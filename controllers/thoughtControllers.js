const {Thoughts, Users} = require('../models');

const createThought = async(req,res) => {
    try {
        let newThought = await Thoughts.create(req.body);
        let updatedUser = await Users.findOneAndUpdate(
            {
                _id: req.body.userId,
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
        res.status(200).json({message: 'Thought successfully created!!'})

    } catch(error) {
        console.log(error);
        res.status(500).json(error)
    }
};


const updateThought = async (req,res) => {
    try{
        let thoughtData = await Thoughts.findOneAndUpdate(
            { 
                _id: req.params.thoughtsId 
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


const deleteThought = async (req,res) => {
    try {
        let thoughtData = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });
        let deletedThought = await Users.findOneAndUpdate(
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
          if (!deleteThought) {
            res.status(404).json({message: 'Thought created successfully. but no user found with this id!'})
          }
          res.status(200).json(deleteThought);
    }catch (error) {
        res.status(500).json(error);
    }
};

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

const getSingleThought = async (req,res) => {
    try {
        let thoughtData = Thoughts.findOne({_id:req.param.thoughtId});
        if(!thoughtData) {
            res.status(404).json({message: 'No thoughts found for this Id  !'});
        }
        res.status(200).json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};

const addReaction = async(req,res) => {
    try {
        let thoughtData = Thoughts.findOneAndUpdate(
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
            return res.status(404).json({ message: "No thought found with this id!" });
          }
          res.json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};

const removeReaction = async(req,res) => {
    try {
        let thoughtData = Thoughts.findOneAndUpdate(
            { 
                _id: req.params.thoughtId 
            },
            { 
                $pull: { reactions: { reactionId: req.params.reactionId } } 
            },
            { 
                runValidators: true, 
                new: true 
            }
          );
          if (!thoughtData) {
            return res.status(404).json({ message: "No thought found with this id!" });
          }
          res.json(thoughtData);
    } catch(error) {
        res.status(500).json(error);
    }
};




module.exports = {createThought, updateThought,deleteThought, getThoughts, getSingleThought, addReaction, removeReaction};
