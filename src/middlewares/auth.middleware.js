import { asyncHandeler } from "../utils/asyncHandeler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandeler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer", "")

        if (!token) {
            throw new ApiError(401, "Unautorized request")

        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            //TODO-> discuss about frontend
            throw new ApiError(401, "Invalid Acces Token")
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid access token')
    }
})