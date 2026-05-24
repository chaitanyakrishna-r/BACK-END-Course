
// const asyncHandler = (fn) =>async(err,req,res,next)=>{
//     try{
//         func(req,res,next);
//     }
//     catch(err){
//         res.status(err.code || 500 ).json({
//             sucess: false,
//             message: err.message,
//         })

//     }
// }


// export {asyncHandler}


//this is a  higher order function becasue this function take another function as parameter or it returns a function so it is called higher order function



const asnycHandler = (requestHnalder)=>{
    return (req,res,next) =>{
        Promise.resolve(requestHnalder(req,res,next))
        .catch((err)=>next(err));
    }
}

export{asnycHandler};