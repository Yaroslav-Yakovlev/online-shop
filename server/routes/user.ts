import {Request, Response} from "express";
const express = require('express');

const router = express.Router();

router.get('/user', (req: Request, res: Response) => {
    res.json({
        data: 'hey you hit user'
    })
});

module.exports = router;
