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



module.exports = {createThought, updateThought,  }



getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,