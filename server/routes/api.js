const express = require('express');
const router = express.Router();

router.use('/users', require('./users'))
router.use('/messages', require('./messages'))
router.use('/profiles', require('./profiles'))

module.exports = router;
