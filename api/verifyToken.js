import jwt from "jsonwebtoken"

function Auth(req,res,){ 
    const token = req.header('auth-token'); 
    if(!token) return res.status(401).send('Access Denied'); 
    try {
        const verified = jwt.verify(token , process.env.JWT); 
        req.user = verified; 
    } catch (err) {
        res.status(400).send("Invalid Token" )
    }
}