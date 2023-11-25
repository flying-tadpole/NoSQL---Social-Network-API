const router = require('express').Router();


router.route('/')
  .get();

router.route('/:userId')
  .get()
  .post()
  .put()
  .delete();

router.route('/:userId/friends/:friendId')
  .post()
  .delete();

module.exports = router;
