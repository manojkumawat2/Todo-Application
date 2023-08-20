const express = require('express');
const { validate } = require('../middlewares/validation');
const { todoForm } = require('../middlewares/validationRules');
const { getTasks, createTask } = require('../controllers/todo.controller');

const router = express.Router();

router
.get('/', getTasks)
.post('/', validate(todoForm), createTask)
.put('/', (req, res) => {

})
.delete('/', (req, res) => {

});

module.exports = router;