const Product = require("../model/products");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

const getProduct = async(req,res) => {
    if(req.params){
        const _id = req.params.id
        try {
           const findProduct = await Product.findById(_id)
           if(!findProduct){
             return res.status(404).send('Product Not Found')
           }

           res.status(200).send(findProduct)

        } catch (error) {
            res.status(500).send('Internal Server Error') 
        }
    }else{
        res.status(400).send('Bad Request')
    }
}

const postProduct = async (req, res) => {
  try {
    let { title, description, link } = req.body
    let createdAt = new Date()
    const files = req.files

    if (!files) {
      return res.status(400).json({ error: "No files were uploaded." })
    }

    const imagePaths = []

    for (const key in files) {
      if (files) {
        const file = files[key]
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const filePath = `images/${uniquePrefix}_${file.name}`

        await file.mv(filePath)
        imagePaths.push(filePath)
      }
    }
    const product = new Product({
      title,
      image: imagePaths,
      description,
      link,
      createdAt,
    })
    await product.save()
    res.status(200).send(product)
  } catch (error) {
    res.status(500).send("Server error")
  }
}

const editProduct = async (req, res) => {
    try {
      let { title, description, link } = req.body
      const files = req.files
      const _id = req.params.id
      const updatedAt = new Date()
      let imagePaths = []
      if (!files) {
        const product = await Product.findById(_id)
        imagePaths = product.image
      } else {
        for (const key in files) {
            if (files) {
                const file = files[key]
                const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9)
                const filePath = `images/${uniquePrefix}_${file.name}`;
        
                await file.mv(filePath)
                imagePaths.push(filePath)
              }
        }
      }
  
      
      const updatedProduct = {
        title,
        image: imagePaths,
        description,
        link,
        updatedAt,
      }
  
      
      const result = await Product.findByIdAndUpdate(_id, updatedProduct, { new: true })
  
      res.status(200).send(result)
    } catch (error) {
      res.status(500).send("Server error")
    }
  }
  

  const deleteProduct = async(req,res) => {
    if(req.params){
        const _id = req.params.id
        try {
           const deleteProduct = await Product.findByIdAndDelete(_id)
           if(!deleteProduct){
             return res.status(404).send('Product not Found')
           }

           res.status(200).send(deleteProduct)

        } catch (error) {
            res.status(500).send('Internal Server Error') 
        }
    }else{
        res.status(400).send('Bad Request')
    }
}


module.exports = {postProduct, getProduct, getProducts, deleteProduct, editProduct}
