import { asyncHandeler } from "../utils/asyncHandeler.js"

const registerUser = asyncHandeler(async (req, res) => {
    res.status(200).json(
        {
            message: "hEY THERE I AM WORKING FINE ",
        })
})

export { registerUser } 