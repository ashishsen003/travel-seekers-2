import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/bookings.js'

dotenv.config()
const app = express()
const port  = process.env.PORT || 8000
const corsOptions = {
    origin : true,
    Credentials: true
}

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
app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', bookingRoute)

app.get('/test', (req, res)=>{
    res.send('api is working')
})

app.listen(port, ()=>{
    connect()
    console.log('server listening on port', port);
})


