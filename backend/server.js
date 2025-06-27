const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const connectDB=require('./config/dbConn')
const app=express()
const port=process.env.PORT || 4000;
require('dotenv').config()
app.use(express.json())

app.use(cors())
connectDB()
app.get('/',(req,res)=>{
    res.send('API Working')
})



app.use('/api/food',require('./routes/foodRouter'))
app.use('/api/user',require('./routes/userRouter'))
app.use('/api/cart',require('./routes/cartRouter'))
app.use('/api/order',require('./routes/orderRouter'))
app.use("/image",express.static("uploads"))
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})