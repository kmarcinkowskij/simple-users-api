const express = require('express')
const router = express.Router()
const User = require("../models/rest_user_model")
const { deleteOne, findById } = require('../models/rest_user_model')
// get all info 
// get one
// create info
// update info
// delete info

//GET ALL POSSIBLE INFO 
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err){
        res.status(500).json({ message: err.message})
    }
})

//GET ONLY ONE WITH AN ID SPECIFIED BY THE USER
router.get('/:id', getUser ,(req, res) => {
    res.send(res.found_user.name)
})

//LET USER CREATE NEW DB INFO 
router.post('/', async (req, res) => {
    const a_user = new User({
        name: req.body.name,
        surname: req.body.surname,
        dateJoined: req.body.dateJoined,
        premium: req.body.premium,

    })

    try{
        const newUser = await a_user.save()
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
})


//LET USER UPDATE DB INFO
router.patch('/:id', getUser, async(req, res) => {
    if (req.body.name != null) {
        res.found_user.name = req.body.name;
    }

    try {
        const updatedUser = await res.found_user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
})

//LET USER DELETE SPECIFIC DATABASE INFO VIA SPECIFIED ID

// TO BE DONE YET!!!!
//  DOESN'T WORK, CAUSES A LOOP
router.delete('/:id', getUser,async (req, res) => {

    try {
        await res.found_user.deleteOne({id: req.params.id})
        res.send({message: 'deleted specified User'})
    }catch(err) {
        res.status(500).json({message: err.message})
    }
    // console.log(req.params.id)
    // try {
    //     let query = {id: req.params.id}
    //     await User.deleteOne(query)
    // } catch (err){
    //     res.status(500).json({ message: err.message})
    // }
})

//FIXED, WORKS NOW

async function getUser(req, res, next) {
    let a_user;
    try {
        a_user = await User.findById(req.params.id)
        if (a_user == null) {
            return res.status(404).json({ message: 'User not found' })
        }
    }catch(err) {
        return res.status(500).json({message: err.message})
    }

    res.found_user = a_user
    next()
}
module.exports = router;