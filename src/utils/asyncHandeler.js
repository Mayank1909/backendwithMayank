const asyncHandeler = (requestHandeler) => {
    return (req, res, next) =>
        Promise.resolve(requestHandeler(req, res, next)).
            catch((err) => next(err))
}

export { asyncHandeler }



// const asyncHandler = (fn) => async (req,res,next) =>{
//     try{
//         await fn(req,res,next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }
