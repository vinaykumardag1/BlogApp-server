const bcrypt = require('bcryptjs')
const User = require('../model/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }   

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user
        const saveUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await saveUser.save();
        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: error.message });
    }
};


const Login=async(req,res)=>{
    try{
        const {email,password}=req.body
        // if(!email || !password){
        //     return res.status(400).json({message:'All fields are required'})
        // }
        const user=await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:'user does not exist'})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:'invalid credentials'})
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(200).json({ token:token, userId: user._id, message: 'Login successful' });
    }catch(error){
        res.status(500).json({message:error.message})
        console.log("error during login",error)
    }
}

const getUser=async(req,res)=>{
    const {id}=req.params
    try{
        const user=await User.findById(id)
        res.status(200).json({user})
        
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
const Logout=async(req,res)=>{
    
    try{
        req.logout()
        req.session().destroy()
        res.redirect('/')
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports = {
    Register,
    Login,
    getUser,
    Logout,

}
