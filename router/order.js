const { Router } = require('express')
const Order = require('../model/order')
const { sendOrder, deleteOrder, editOrder } = require('../bot')
const router = Router()



router.get('/', async(req,res)=>{
    let orders = await Order.find({}).lean()
    res.send(orders)
})

router.post('/',async(req,res)=>{
    if (req.body){
        let {description, name, phone, typeId} = req.body 
        let newOrder = await new Order({
            description,
            name,
            phone,
            typeId,
            messageId: 1,
            createdAt: new Date()
        })
        await newOrder.save()
        await sendOrder(newOrder)
        res.send(newOrder)
    }
})

router.get('/:id', async(req,res)=>{
    if (req.params){
        let _id = req.params.id
        const order = await Order.findById(_id)
        res.send(order)
    }
})


router.delete('/delete/:id', async(req,res)=>{
    if (req.params){
        let _id = req.params.id
        let order = await Order.findByIdAndDelete(_id)
        deleteOrder(order)
        res.send(order)
    }
})

router.put('/edit/:id', async(req, res) => {
    if (req.params && req.body) {
        const _id = req.params.id;
        const { description, name, phone, typeId } = req.body
        try {
            const updatedOrder = await Order.findByIdAndUpdate(_id, {
                description,
                name,
                phone,
                typeId,
                updatedAt: new Date()
            }, { new: true });

            if (!updatedOrder) {
                return res.status(404).send('Order not found');
            }
            await editOrder(updatedOrder);
            res.send(updatedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request');
    }
});

router.put('/status/:id', async(req, res) => {
    if (req.params && req.body) {
        const _id = req.params.id;
        const { status } = req.body;

        try {
            const updatedOrder = await Order.findByIdAndUpdate(_id, {
                status,
                updatedAt: new Date()
            }, { new: true });

            if (!updatedOrder) {
                return res.status(404).send('Order not found');
            }
            res.send(updatedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Bad Request');
    }
});

module.exports = router