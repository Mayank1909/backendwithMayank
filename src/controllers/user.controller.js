import { asyncHandeler } from "../utils/asyncHandeler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandeler(async (req, res) => {

    // get user detail from frontend- done
    // validation- not empty - done
    // check if user already exist: through username or email - done 
    // check for avatar and images both
    // if available then upload them to cloudinary, avatar
    // create user object- create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res 

    const { fullName, email, username, password } = req.body
    console.log("email", email)

    if (
        [fullName, email, username, password].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "All fields are compulsory and required")
    }
    // if (fullName === "") {
    //     throw new Apierror(400,"fillname is required")
    // }
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with eamil already exist")
    }

    const avatarLocalpath = req.files?.avatar[0]?.path;

    const coverImagelocalpath = req.files?.coverImage[0]?.path;

    if (!avatarLocalpath) {
        throw new ApiError(400, "avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalpath)
    const coverImage = await uploadOnCloudinary(coverImagelocalpath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")

    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLoweraCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "there was a problem in registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered sucesfully")
    )
})

export { registerUser } 