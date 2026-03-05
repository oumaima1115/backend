// les route
const express = require('express');
const router = express.Router();
const controller = require('../controllers/table.controller');
const { authMiddleware } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/role.middleware");

// specific routes FIRST
router.get('/capacity/:min', controller.getByCapacity);
router.delete('/capacity/:id', controller.removeIfCapacityOK);

// generic routes AFTER
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', authMiddleware, adminOnly, controller.remove);

module.exports = router;

// Express does NOT know which route is “specific” or “generic”.
// It simply reads routes from top to bottom, in the order you write them.
// That’s why you must put specific routes first.