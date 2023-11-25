const router = require('express').Router();
const { Thought } = require('../../models')

router.route('/')
  .get(
    async function(req, res) {
      try {
        const thoughts = await Thought.find()
        res.json({thoughts})
      } catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
    }
  );


router.route('/:thoughtId')
  .get(
    async function(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
        if (!student) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
        res.json({thought});
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    }
  )
  .post()
  .put()
  .delete();

router.route('/:thoughtId/reactions')
  .post()
  .delete()

module.exports = router;
