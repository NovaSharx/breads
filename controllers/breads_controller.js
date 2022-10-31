const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const SampleBreads = require('../models/samplebreads.js')

// INDEX
breads.get('/', (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index',
                {
                    breads: foundBreads,
                    title: 'Index Page'
                }
            )
        })
})

// NEW
breads.get('/new', (req, res) => {
    res.render('new')
})

// MULTIPLE NEW
breads.get('/data/seed', (req, res) => {
    Bread.insertMany(SampleBreads)
        .then(createdBreads => {
            res.redirect('/breads')
        })
})

// SHOW
breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('show', {
                bread: foundBread
            })
        })
        .catch(err => {
            res.render('error404')
        })
})

//EDIT
breads.get('/:id/edit', (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render('edit', {
                bread: foundBread
            })
        })
})

//UPDATE
breads.put('/:id', (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    } else {
        req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedBread => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.id}`)
        })
})

// DELETE
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            res.status(303).redirect('/breads')
        })
})

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
        req.body.image = undefined
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = true
    }
    else {
        req.body.hasGlutern = false
    }
    Bread.create(req.body)
    .then(res.redirect('/breads'))
    .catch(err => {
        console.log(err)
        res.redirect('error404')
    })
})

module.exports = breads