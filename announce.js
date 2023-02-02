const express = require('express');
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const { announce } = new PrismaClient();

router.get('/', async (req,res) => {
    const an = await announce.findMany().catch(err => {
        res.status(500).json({
            error: err.message
        });
    });

    res.status(200).json(an);
});

router.get('/:Id', async (req,res) => {
    const an = await announce.findMany({
        where: {
            id: parseInt(req.params.Id)
        }
    }).catch(err => {
        res.status(500).json({
            error: err.message
        });
    });

    res.status(200).json(an);
});

module.exports = router;