// les route
const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// Auth routes
router.post('/signup', controller.signUp);
router.post('/signin', controller.signIn);
router.post('/logout', controller.logout);

// generic routes
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
