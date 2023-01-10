const express = require('express')
const router = express.Router()
const User = require("../models/rest_user_model")
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

//FILTER USERS BY NAME
router.get('/:name', getByName ,async (req, res) => {
    try {
        await res.json({
            "message": 'found user[s]',
            "amount": res.count_users_name,
            "user[s] with that name": res.found_user_by_name
        })
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})


//DELETE USERS BY NAME
router.delete('/:name', getByName, async (req, res) => {
    try {
        // await res.json({ message: res.found_user_by_name })
        await User.deleteOne({ name: req.params.name })
                res.status(200).json({ message: 'User deleted successfully'})
    }catch(err) {
        res.status(500).json({ message: err.message})
    }

})

//GET ONLY ONE WITH AN ID SPECIFIED BY THE USER
router.get('/:id', getUser ,(req, res) => {

    res.json({
        message: "User Found",
        "id": res.found_user.id,
        "name": res.found_user.name,
        "surname": res.found_user.surname,
        "is premium?": res.found_user.premium,
        "gender": res.found_user.gender,
    })
})


//LET USER CREATE NEW DB INFO 
router.post('/', async (req, res) => {
    const a_user = new User({
        name: req.body.name,
        surname: req.body.surname,
        dateJoined: req.body.dateJoined,
        premium: req.body.premium,
        gender: req.body.gender,

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
    if (req.body != null) {
        res.found_user.name = req.body.name;
        res.found_user.surname = req.body.surname;
        res.found_user.dateJoined = req.body.dateJoined;
        res.found_user.premium = req.body.premium;
        res.found_user.gender = req.body.gender;
    }

    try {
        const updatedUser = await res.found_user.save()
        res.json(updatedUser)
    } catch(err) {
        res.status(400).json({ message: err.message})
    }
})

//LET USER DELETE SPECIFIC DATABASE INFO VIA SPECIFIED ID
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

async function getByName(req, res, next) {
    let a_user_name;
    let users_amount;
    try {
        a_user_name = await User.find({name: req.params.name})
        users_amount = await User.count({name: req.params.name})
        if (a_user_name == null) {
            return res.status(404).json({message: 'User not found'})
        }
    } catch (err) { 
        return res.status(500).json({message: err.message})
    }

    res.found_user_by_name = a_user_name
    res.count_users_name = users_amount
    next()
}

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