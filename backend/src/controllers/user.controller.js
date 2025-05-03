import { User } from "../models/user.model"
import httpStatus from "http-status"
import bcrypt from "bcrypt"

const register = async (req, res) => {
    const {name, username, password} = req.body

    try{
        const existingUser = User.findOne({username})

        if(existingUser){
            return res.status(httpStatus.FOUND).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password)
    }catch{

    }
}