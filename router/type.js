const { Router } = require('express')
const router = Router()
const Type = require('../model/type')



router.get('/', async(req,res) => {
    let types = await Type.find({}).lean()

    res.send(types)
})


router.post('/', async (req,res) => {
    try {
        const { name } = req.body
        const newType = new Type({
            name,
            createdAt: new Date()
        })

        await newType.save()
        res.status(200).send(newType)
    } catch (error) {
       res.status(500).send('Internal Server Error') 
    }   
})

router.put('/edit/:id', async (req,res) => {
    if(req.params && req.body){
        const _id = req.params.id
        const { name } = req.body

        try {
            const updatedType = await Type.findByIdAndUpdate(_id, {
                name
            }, {new: true})
            
            if(!updatedType){
                return res.status(404).send('Type not found')
            }

            res.status(200).send(updatedType)
        } catch (error) {
           res.status(500).send('Internal Server Error') 
        } 
    }else{
        res.status(400).send('Bad Request')
    }
})


router.delete('/delete/:id', async(req,res) => {
    if(req.params){
        const _id = req.params.id
        try {
           const deleteType = await Type.findByIdAndDelete(_id)
           if(!deleteType){
             return res.status(404).send('Type not Found')
           }

           res.status(200).send(deleteType)

        } catch (error) {
            res.status(500).send('Internal Server Error') 
        }
    }else{
        res.status(400).send('Bad Request')
    }
})


router.get('/:id', async(req,res) => {
    if(req.params){
        const _id = req.params.id
        try {
           const findType = await Type.findById(_id)
           if(!findType){
             return res.status(404).send('Type not Found')
           }

           res.status(200).send(findType)

        } catch (error) {
            res.status(500).send('Internal Server Error') 
        }
    }else{
        res.status(400).send('Bad Request')
    }
})


module.exports = router