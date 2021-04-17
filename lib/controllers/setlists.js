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

    .get('/:id', (req, res, next) => {
        Setlist.getById(req.params.id)
        .then((setlist) => res.send(setlist))
        .catch(next)
    })

    .put('/:id', (req, res, next) => {
        Setlist.update(req.params.id, req.body)
        .then((setlist) => res.send(setlist))
        .catch(next)
    })

    .delete('/:id', (req, res, next) => {
        Setlist.delete(req.params.id)
        .then((setlist) => res.send(setlist))
        .catch(next)
    })