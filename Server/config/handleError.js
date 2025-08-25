
export const handleError = (error , req , res , next) => {
    console.log(error)
    return res.status(error.status || 500).json({
        message : error.message || error,
        error : true,
        success  : false
    })
}