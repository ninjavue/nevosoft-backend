const { Router } = require('express')
const User = require('../model/user')
const router = Router()



router.get('/', async(req,res)=>{
    let users = await User.find({}).lean()
    res.send(users)
})


module.exports = router