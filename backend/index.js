import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port  = process.env.PORT || 8000

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
    }
}

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/test', (req, res)=>{
    res.send('api is working')
})

app.listen(port, ()=>{
    connect()
    console.log('server listening on port', port);
})


