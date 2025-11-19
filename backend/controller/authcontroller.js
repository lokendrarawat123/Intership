import db from "../config/dbconnection.js";

// export  const testcontroller =(req,res)=>{
//     res.send("hello kabi ko budi")
// }
// export const callme= async(req,res)=>{
//    try {
//     const [user]=await db.query("SELECT * FROM users");
//     res.status(200).json({
//         data:user,
//     })
//    } catch (error) {
//     console.log(error);
//    }
// }




// Login Api
export const login=async(req,res)=>{
    //1. get email  and password from user side.
    try {
        const {email,password}=req.body;
        // 2 .validation for  login
        if(!email || !password){
            return res.status(400)
            .json({message:"email and password are required"})
        }
        // 3 check user is available in database 
        const[result]=await db.execute("select * from users where email =? and password=?",[email,password,]);
        //4 user found ?
        if(result.length===0){
            return res.status(400).json({
                message:"invalid credentials",
            })
        }
        // 4 success 
        const user =result[0];
        res.status(200).json({
            message:"login succesfull",
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                created_at:user.created_at,
            },
        })
        
    } catch (error) {
       console.log(error); 
    }

}
