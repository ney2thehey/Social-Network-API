const router = require('express').Router();

const {
    getUsers,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend

} = require('../../controllers/userController');


//get user by ID
router.route('/:userId').get(getUserbyID);
//create route
router.route('/').get(getUsers).post(createUser);


//update or put with id

router.route('/:userId')
.get(getUserbyID).put(updateUser);

//remove user with id
router.route('/:userId')
.get(getUserbyID).delete(deleteUser)



//adding or posting a friend into friends list

router.route('/:userId/friends/:friendId').post(addFriend);

//removing or deleting a friend from a different users friend's list

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;
