const router = require('express').Router();
const { User } = require('../../models')

router.route('/')
  .get(
    async function(req, res) {
      try {
        const users = await User.find()
        res.json({users})
      } catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
    }
  )
  .post(
    async function(req, res) {
      try {
        const user = await User.create(req.body)
        res.json(user)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  )

router.route('/:userId')
  .get(
    async function(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
        res.json({user});
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    }
  )
  .put(
    async function (req, res) {
      try {
        const user = await User.findByIdAndUpdate(
          { _id: req.params.userId },
          { $set: req.body })

        if (!user) {
          return res.status(400).json({ message: 'No user with this id.'})
        }

        res.json(user)
      } catch (err) {
        res.status(500).json(err)
      }
    }
    )
  .delete(
    async function (req, res) {
      try {
        const user = await User.findByIdAndRemove({_id: req.params.userId})

        if (!user) {
          return res.status(400).json({ message: 'No user with this id.'})
        }

        res.json(user)
      } catch (err) {
        res.status(500).json(err)
      }
    }
  );

router.route('/:userId/friends/:friendId')
  .post(
    async function (req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  )
  .delete(
    async function (req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: { friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        )
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

module.exports = router;
