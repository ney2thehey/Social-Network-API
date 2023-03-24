const {User, Thought} = require("../models");

module.exports = {
  //get all thoughts
    getThoughts(req,res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
 // get thought by id
    getThoughtbyID(req,res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select("-__v")
        .then((thought)=> 
        !thought ? res.status(404).json({message: "No Thought found"})
            : res.json(thought)
        )
        .catch((err)=> res.status(500).json(err));
    },
     //create a new thought
    createThought(req,res) {
        Thought.create(req.body)
          .then((userData) => res.json(userData))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
      //update thought by the iD
    updateThought(req,res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body})
        .then((user)=> !user ? res.status(404).json
        ({message: "Wrong ID, update failed"}) :
        res.json(user)

        ).catch((err)=> {
            res.status(500).json(err);
        })
    },
    
    deletethought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(()=> res.json({message: "Thought FOUND! Deleted from list"}))
            .catch((err)=> res.status(500).json(err));
    },

    addReaction(req,res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, { $addToSet: {reactions: req.body}}

        ).then((thought) =>
        !thought ? res.status(404).json({message: "No Thought matches that ID, reactions not added"})
        :res.json(thought)
        ).catch((err)=> res.status(500).json(err));

    },

    deleteReaction(req,res){
        const reactionIdValue = req.params.reactionId;
        Thought.findOneAndUpdate(  {_id: req.params.thoughtId}, {$pull: {reactions: {reactionId: reactionIdValue } }}
        )
        .then((thought) =>
        !thought ? res.status(400).json({message: 'Didnt matches ID, reaction not deleted'})
        : res.json(thought)
        ).catch((err)=> res.status(500).json(err))
    }

}