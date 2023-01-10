const express = require('express')
const router = express.Router()
const Tester = require("../models/rest_test")
const { deleteOne, findById } = require('../models/rest_test')
// get all info 
// get one
// create info
// update info
// delete info

//GET ALL POSSIBLE INFO 
router.get('/', async (req, res) => {
    try {
        const testers = await Tester.find()
        res.json(testers)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})

//GET ONLY ONE WITH AN ID SPECIFIED BY THE USER
router.get('/:id', getTester ,(req, res) => {
    res.send(res.etester.name)
})

//LET USER CREATE NEW DB INFO 
router.post('/', async (req, res) => {
    const atester = new Tester({
        name: req.body.name,
    })

    try{
        const newTester = await atester.save()
        res.status(201).json(newTester)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
})


//LET USER UPDATE DB INFO
router.patch('/:id', getTester, async(req, res) => {
    if (req.body.name != null) {
        res.etester.name = req.body.name;
    }

    try {
        const updatedTester = await res.etester.save()
        res.json(updatedTester)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
})

//LET USER DELETE SPECIFIC DATABASE INFO VIA SPECIFIED ID

// TO BE DONE YET!!!!
//  DOESN'T WORK, CAUSES A LOOP
router.delete('/:id', getTester,async (req, res) => {

    try {
        await res.etester.deleteOne({id: req.params.id})
        res.send({message: 'deleted specified tester'})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
    // console.log(req.params.id)
    // try {
    //     let query = {id: req.params.id}
    //     await Tester.deleteOne(query)
    // } catch (err){
    //     res.status(500).json({ message: err.message})
    // }
})

//FIXED, WORKS NOW

async function getTester(req, res, next) {
    let atester;
    try {
        atester = await Tester.findById(req.params.id)
        if (atester == null) {
            return res.status(404).json({ message: 'Tester not found' })
        }
    }catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.etester = atester
    next()
}
module.exports = router;