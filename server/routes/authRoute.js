import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/authModel.js'

const router = express.Router()


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username: username })
        if (user) res.status(401).json("user already exists")

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({
            username: username,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(401).json("user not created ")
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username: username })
        if (!user) res.status(401).json("user not found")

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) res.status(401).json("invalid username & password")

        const token = jwt.sign({ id: user._id }, "secretKey")


        res.status(200).json({ token, userID: user._id, uname: user.username })
    } catch (error) {
        res.status(401).json("user creation failed")
    }
})





export default router

export const verifyToken = (req, res, next) => {
    const Token = req.headers.authorization;
    if (!Token) {
        return res.status(401).json("unauthorized");
    }
    jwt.verify(Token, "secretKey", (err, user) => {
        if (err) {
            return res.status(403).json("forbidden");
        }
        req.user = user
        next();
    });
}