const { Router } = require("express");
const router = Router();
const Emplooye = require("../model/employees");

router.get("/", async (req, res) => {
  try {
    const employees = await Emplooye.find({}).lean();
    res.status(200).send(employees);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get('/:id', async(req,res) => {
    if(req.params){
        const _id = req.params.id
        try {
           const findEmplooye = await Emplooye.findById(_id)
           if(!findEmplooye){
             return res.status(404).send('Type not Found')
           }

           res.status(200).send(findEmplooye)

        } catch (error) {
            res.status(500).send('Internal Server Error') 
        }
    }else{
        res.status(400).send('Bad Request')
    }
})

router.post("/", async (req, res) => {
  try {
    let { full_name, salary, job } = req.body;
    let createdAt = new Date();
    const files = req.files;

    if (!files) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const imagePaths = [];

    for (const key in files) {
      if (files) {
        const file = files[key];
        const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filePath = `images/${uniquePrefix}_${file.name}`;

        await file.mv(filePath);
        imagePaths.push(filePath);
      }
    }
    const newEmployee = new Emplooye({
      full_name,
      img: imagePaths,
      salary,
      job,
      createdAt,
    });
    await newEmployee.save();
    res.status(200).send(newEmployee);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

router.put("/edit/:id", async (req, res) => {
    try {
      const { full_name, salary, job } = req.body;
      const files = req.files;
      const _id = req.params.id
      let imagePaths = [];
      if (!files) {
        const employeeToUpdate = await Emplooye.findById(_id)
        imagePaths = employeeToUpdate.img;
      } else {
        for (const key in files) {
            if (files) {
                const file = files[key];
                const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                const filePath = `images/${uniquePrefix}_${file.name}`;
        
                await file.mv(filePath);
                imagePaths.push(filePath);
              }
        }
      }
  
      
      const updatedEmployee = {
        full_name,
        img: imagePaths,
        salary,
        job,
      };
  
      
      const result = await Emplooye.findByIdAndUpdate(_id, updatedEmployee, { new: true });
  
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  });
  

router.delete('/delete/:id', async(req,res) => {
    if(req.params){
        const _id = req.params.id
        try {
           const deleteEmplooye = await Emplooye.findByIdAndDelete(_id)
           if(!deleteEmplooye){
             return res.status(404).send('Emplooye not Found')
           }

           res.status(200).send(deleteEmplooye)

        } catch (error) {
            res.status(500).send('Internal Server Error') 
        }
    }else{
        res.status(400).send('Bad Request')
    }
})


module.exports = router;
