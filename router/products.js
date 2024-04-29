const express = require('express')
const router = express.Router()



const { postProduct, getProduct, getProducts, deleteProduct, editProduct } = require('../controllers/products')


router
    .route('/')
    .post(postProduct)
    .get(getProducts)
router
    .route('/delete/:id')
    .delete(deleteProduct)
router
    .route('/edit/:id')
    .put(editProduct)
router
    .route('/:id')
    .get(getProduct)

    
module.exports = router