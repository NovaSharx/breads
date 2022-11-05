const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const SampleBreads = require('../models/samplebreads.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', async (req, res) => {
    // Refactored to use async/await
    const foundBakers = await Baker.find()
    const foundBreads = await Bread.find().populate('baker')

    res.render('index',
        {
            breads: foundBreads,
            bakers: foundBakers,
            title: 'Index Page'
        }
    )
})

// NEW
breads.get('/new', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            res.render('new', {
                bakers: foundBakers
            })
        })
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
        .populate('baker')
        .then(foundBread => {
            Bread.getBreadsByBaker(foundBread.baker)
                .then(breadsByBaker => {
                    console.log(breadsByBaker)
                    res.render('show', {
                        bread: foundBread,
                        breadsByBakerArray: breadsByBaker
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.render('error404')
        })
})


//EDIT
breads.get('/:id/edit', (req, res) => {
    Baker.find()
        .then(foundBakers => {
            Bread.findById(req.params.id)
                .then(foundBread => {
                    res.render('edit', {
                        bread: foundBread,
                        bakers: foundBakers
                    })
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
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedBread => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('error404')
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
        .then(() => {
            res.redirect('/breads')
        })
        .catch(err => {
            console.log(err)
            res.render('error404')
        })
})

module.exports = breads