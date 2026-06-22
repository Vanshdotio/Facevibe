const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router();

router.post('/user/register',authController.userRegister)
router.post('/user/login',authController.userLogin)
router.get('/user/logout',authController.userLogout)


module.exports = router;