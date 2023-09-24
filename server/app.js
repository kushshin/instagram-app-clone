import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRouter from './routes/authRoute.js'
import postRouter from './routes/postRoute.js'
import userRouter from './routes/userRoute.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/auth", authRouter)
app.use("/post", postRouter)
app.use("/user", userRouter)

mongoose.connect("mongodb://127.0.0.1:27017/INSTAGRAMAPP", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected")
    }).catch(() => {
        console.log("DB not connected")
    })


app.listen(3001, () => {
    console.log("server is running")
})