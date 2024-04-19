const router = require('express').Router();
const {signUp,login} = require('../controllers/Auth');

router.post('/signup', signUp);
router.post('/login', login)

module.exports = router;