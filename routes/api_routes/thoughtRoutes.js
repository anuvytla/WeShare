const router = require('express').Router();

const {
    createThought,
    updateThought,
    deleteThought,
    getThoughts,
    getSingleThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtControllers');

// /api/thoughts - GET and POST(create).
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId - GET, PUT(update) and DELETE.
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions - Create a new reaction.
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId - Delete a reaction.
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router; 

