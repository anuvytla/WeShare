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

router.route('/').get(getThoughts).post(createThought);

router.route('./:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);


router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router; 

