import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.accessToken
    console.log(token);
    if(!token){
        res.status(401).json({success: false, message: "You're not authorize 1"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(401).json({success: false, message: 'token is invalid'})
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req, res, next, () => {
        if(req.user.id === user.params.id || req.user.role === 'admin'){
            next()
        } else {
            return res.status(401).json({success: false, message: "You're not athenticated 11"})
        }
    })
}

export const verifyAdmin = (req, res, next)=>{
    verifyToken(req, res, next, () => {
        if(req.user.role === 'admin'){
            next()
        } else {
            return res.status(401).json({success: false, message: "You're not authorize 11"})
        }
    })
}