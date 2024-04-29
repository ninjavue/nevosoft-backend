const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors');
const app = express()
const connectToDatabase = require('./database')



app.use(fileUpload())



app.use(express.json())
app.use(cors());
app.use('/images',express.static('images'))


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(cors({
    origin: '*',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials:  true
}))

require('./bot')

// All Router get
const userRouter = require('./router/users')
const orderRouter = require('./router/order')
const typeRouter = require('./router/type')
const authRouter = require('./router/auth')
const employeesRouter = require('./router/employees')
const productRouter = require('./router/products')
const questionRouter = require('./router/question')

// Router configuration
app.use('/api/v1/users', userRouter) 
app.use('/api/v1/order', orderRouter) 
app.use('/api/v1/type', typeRouter) 
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/employees', employeesRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/question', questionRouter)

// Server is running
async function dev(){
    try {
        await connectToDatabase();
        
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

dev()
