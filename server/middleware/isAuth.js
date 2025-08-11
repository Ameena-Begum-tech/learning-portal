import jwt from 'jsonwebtoken';
import { User } from "../models/user.js";

export const isAuth = async(req, res, next) => {
    try{
       const token=req.headers.token;
         if(!token) {
              return res.status(403).json({ message: "Please Login" });
         }
         const decodedData=jwt.verify(token, process.env.Jwt_Sec);
         req.user = await User.findById(decodedData._id);

         if (!req.user) {
            // If the user for the token is not found, deny access.
            return res.status(401).json({ message: "Login First" });
         }

         next();
    }
    catch(error) {
        return res.status(401).json({ message: "Login First" });
    }
};

export const isAdmin = async(req, res, next) => {
    try{
        // This check will now work correctly because req.user is the full user document.
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "You are not an admin" });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
}