const router = require('express').Router();
const {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    getSingleUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userControllers');

// /api/users - GET and POST(create).
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId - GET and PUT(update) and DELETE a specific user.
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId - Create and delete friend connections.
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);





module.exports = router;