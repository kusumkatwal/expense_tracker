const UserModel = require("../models/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

exports.register = async(req, res) => {
    
    try{
        console.log('entering')
        var payload = req.body;
        payload.password = bcrypt.hashSync(payload.password,10);
    const user = new UserModel(payload);
    const response = user.save();

    res.json({
        result:response,
        message: "User Registered Successfully.",
        meta: null
    })

    }catch(exception)
    {
        console.log(exception)
       res.status(500).json({message : 'Server Error'})
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });

        // If user does not exist, return 404 Not Found
        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords don't match, return 401 Unauthorized
        if (!isPasswordValid) {
            return res.status(500).json({ message: 'Invalid email or password' });
        }

        // Create and send JWT token if authentication is successful
        const token = jwt.sign({ userId: user._id }, 'ichikoaoba', { expiresIn: '1day' });
        res.json({ token, message: 'User logged in successfully', meta: null });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getLoggedInUser = (req, res) => {
    const loggedInUser = req.authUser;
    res.json({
        result: loggedInUser,
        message: "mounted",
        meta: null
    })
}
