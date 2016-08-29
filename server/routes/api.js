const express = require('express');
const router = express.Router();

router.use('/users', require('./users'))
router.use('/messages', require('./messages'))
router.use('/profiles', require('./profiles'))
router.use('/games', require('./games'))

module.exports = router;
