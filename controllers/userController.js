const {User, Thought} = require("../models");

module.exports = {
  //get all users
    getUsers(req,res) {
        User.find()
        .select('-__v')
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    // get user by id
    getUserbyID(req,res) {
      User.findOne({_id: req.params.userId})
        .select('-__v')
        
        .then((user) => 
        !user ? res.status(404).json({message: 'User not found with that ID'}) : res.json(user)
        )
        .catch((err)=> res.status(500).json(err))
    },
      //create a new user
    createUser(req, res) {
        User.create(req.body)
          .then((userData) => res.json(userData))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      //update user by the iD
    updateUser(req,res){
      User.findOneAndUpdate({_id: req.params.userId},{$set: req.body})
      
      .then((user)=> !user ? res.status(404).json({messgae: "User ID not found, update failed"}) : res.json(user)
      ).catch((err)=> {
        res.status(500).json(err);
      })
    },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(400).send("ID doesn't exsist")
        }
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: "User deleted from list" }))
      .catch((err) => res.status(500).json(err));
  },

    addFriend(req,res) {
      User.findOneAndUpdate( {_id: req.params.userId},{ $addToSet: {friends: req.params.friendId}}
      )
      .then((user)=>!user ?res.status(404).json({message: "ID does not exist"}):res.json(user)
      ).catch((err)=> res.status(500).json(err));
    },

    deleteFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId }, {$pull: {friends: req.params.friendId} })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No ID found' })
            : res.json(user)
        )

        .catch((err) => res.status(500).json(err));
    },
  };