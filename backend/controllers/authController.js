import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const resgister = async(req, res)=>{
    try {
        const hash = bcrypt.hashSync(req.body.password, 10)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
        })
        await newUser.save()
        res.status(200).json({success: true, message: 'Successfully created'})
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to create'})
    }
}

export const login = async(req, res)=>{
    const email = req.body.email
    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({success: false, message: 'User not found'})
        }

        const checkPassword = await bcrypt.compare(req.body.password, user.password)

        if(!checkPassword){
            return res.status(401).json({success: false, message: 'Incorrect email or password'})
        }
        const {password, role, ...rest} = user._doc

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: '15d'})

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({token, data: {...rest}, role})
    } catch (error) {
        res.status(500).json({success: false, message: 'Failed to login'})
    }
}