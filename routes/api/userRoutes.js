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
    
  )
  .delete();

router.route('/:userId/friends/:friendId')
  .post()
  .delete();

module.exports = router;
