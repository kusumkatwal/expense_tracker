const jwt = require('jsonwebtoken');
const UserModel = require('..//models/UserModel');
const authCheck = async (req, res, next) => {
   try{ 
    let token;
    if(req.headers['authorization']){
        token = req.headers['authorization']
    }else{
       return res.json({code: 401, message: "Token not set"})
    }

    //Bearer ===> {"Bearer",""}
   

    if(!token) {
        return res.json({code: 401, message: "Empty token"})
    }
    else {
        token = token.split(' ').pop();
    }

    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    const decoded = jwt.verify(token, "ichikoaoba")
    //console.log(decoded)
    const userDetail = await UserModel.findOne({_id: decoded.userId})
    console.log(userDetail)
    
    if(!userDetail)
    {
       return res.json({code: 401, message: "User does not exist anymore!"})
    }
    else {
        req.authUser = userDetail 
        console.log(req.authUser)
        next()
    }
    
   }catch (exception){
    console.log("JWT Verification: ", exception)
    return res.json({code: 401, message: "User not authorized"})
   }
}

module.exports = authCheck;