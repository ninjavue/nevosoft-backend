require('dotenv').config();
const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const Auth = require('../model/auth')

router.get('/all', async(req, res) => {
    try {
        const auth = await Auth.find({}).lean()
        res.status(200).send(auth)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id
        const auth = await Auth.findById(id).lean()
        if(!auth){
            res.status(404).send('Not Found')
        }
        res.status(200).send(auth)
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
})

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).send('Login or Password is missing');
    }

    try {
        const auth = await Auth.findOne({ login, password }).lean();
        if (!auth) {
            return res.status(404).send('Login or Password error');
        }

        
        const id = auth._id
        const admin = auth.admin
        const accessToken = jwt.sign({ id, admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });

        res.status(200).send({ accessToken });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.post('/create/login', async(req,res) => {
    if(req.body){
        const { login, password } = req.body
        try {
            const newAuth = new Auth({
                login,
                password,
                createdAt: new Date()
            }) 
            await newAuth.save()
            res.status(200).send(newAuth)
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Bad Request');
    }
})

router.put('/edit/:id', async(req, res) => {
    if(req.params && req.body){
        const id = req.params.id
        const {login, password} = req.body
        try {
            const updatedAuth = await Auth.findByIdAndUpdate(id,{
                login,
                password
            }, {new: true})

            if(!updatedAuth){
                res.status(404).send('Not Found')
            }
            res.status(200).send(updatedAuth)
        } catch (error) {
            res.status(500).send('Internal Server Error')
        }
    }else{
        res.status(400).send('Bad Request');
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteAuth = await Auth.findByIdAndDelete(id)

        if(!deleteAuth){
            res.status(404).send('Not Found')
        }

        res.status(200).send(deleteAuth)
    } catch (error) {
       res.status(500).send('Internal Server Error') 
    }
})

module.exports = router