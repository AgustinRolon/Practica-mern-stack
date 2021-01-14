const {
    Router
} = require('express');
const router = Router();

const {
    createUser,
    getUser,
    deleteUser
} = require('../controllers/user.controllers')

router.route('/')
    .get(getUser)
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)

module.exports = router;