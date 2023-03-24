const router = require('express').Router();

const {
    getThoughts,
    getThoughtbyID,
    createThought,
    updateThought,
    deletethought,
    addReaction,
    deleteReaction


} = require('../../controllers/thoughtController')

//Get all thoughts here
router.route('/')
.get(getThoughts).post(createThought)
//thought with ID
router.route('/:thoughtId')
.get(getThoughtbyID)
//Update and or put one thought with ID
router.route('/:thoughtId')
.get(getThoughtbyID).put(updateThought)
//remove a thought 
router.route('/:thoughtId')
.get(getThoughtbyID).delete(deletethought)


router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
module.exports = router;
