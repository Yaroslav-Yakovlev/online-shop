const express = require('express');

const router = express.Router();

// middlewares
const {authCheck} = require('../middlewares/auth');

// controller
import {createOrUpdateUser} from "../controllers/auth";

router.post('/create-or-update-user', authCheck, createOrUpdateUser);

module.exports = router;

