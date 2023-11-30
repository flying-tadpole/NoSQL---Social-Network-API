const router = require('express').Router();
const { Thought, User } = require('../../models')

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
  )
  .post(
    async function(req, res) {
      try {
        const thought = await Thought.create(req.body)
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        )

        if (!user) {
          return res.status(404).json({
            message: 'Thought created, but found no user with that ID',
          });
        }

        res.json(thought)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  )


router.route('/:thoughtId')
  .get(
    async function(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' })
        }
        res.json({thought});
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    }
  )
  .put(
    async function(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(thought)
      } catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
    }
  )
  .delete(
    async function (req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        const user = await User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'Thought deleted but no user with this id!' });
        }
  
        res.json({ message: 'Thought successfully deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
  );

router.route('/:thoughtId/reactions')
  .post(
    async function (req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  )
  .delete(
    async function (req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  )

module.exports = router;
