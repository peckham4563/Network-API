const router = require('express').Router()
const {
createThought,getThought,getSingleThought,deleteThought,addReaction,deleteReaction
} = require('../../controllers/thought-controller')
router.route('/').get(getThought).post(createThought)
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router