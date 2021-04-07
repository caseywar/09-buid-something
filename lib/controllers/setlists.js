const { Router } = require('express');
const Setlist = require('../models/Setlist');

module.exports = Router()
    .post('/', (req, res, next) => {
        Setlist.insert(req.body)
        .then((setlist) => res.send(setlist))
        .catch(next);
    })

    .get('/', (req, res, next) => {
        Setlist.find()
            .then((setlists) => res.send(setlists))
            .catch(next);
    })