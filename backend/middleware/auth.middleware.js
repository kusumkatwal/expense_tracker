const jwt = require('jsonwebtoken');
const UserModel = require('../modules/user/user.model');
const authCheck = async (req, res, next) => {
   try{ 
    let token;

    if(req.headers['authorization']){
        token = req.headers['authorization']
    }else{
        next({code: 401, message: "Token not set"})
    }

    //Bearer ===> {"Bearer",""}
    token = (token.split(' ')).pop();

    if(!token) {
        res.json({code: 401, message: "Empty token"})
    }

    //token set
    const decoded = jwt.verify(token, "ichikoaoba")
    // console.log(decoded)
    const userDetail = await UserModel.findOne({_id: decoded.sub})
    // console.log('userdetail')
    console.log(userDetail)
   
    if(!userDetail) {
        res.json({code: 401, message: "User does not exist anymore!"})
    }else {
        req.authUser = userDetail
        
        next()
    }
    
   }catch (exception){
    console.log("JWT Verification: ", exception)
    res.json({code: 401, message: "User not authorized"})
   }
}

module.exports = authCheck;