import db from "../config/dbconnection.js";

export  const testcontroller =(req,res)=>{
    // res.send("hello kabi ")
}
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
export const login =async(req,res) =>{
    try{
        //1.get email and password from user side.
        const {email,password}=req.body;
        // 2.simple Validation

        if (!email || !password){
            return res 
            .status(600)
            .json({message:"Email and Password are required"});
        }
        // CHECK USER IS AVAILABLE IN DATABASE
       const [result]= await db.execute("SELECT * FROM users WHERE email=? AND password =?",[
            email,
            password,
        ]);
        // 3.USER FOUND
        if (result.length === 0){
            return res.status(400).json({
                message:"Invalid Credentials",
            });
        }
        // 4.SUCESS
        const user =result[0];
        res.status(200).json({
            message: "login Sucessful",
            user:{
                id:user.id,
                name:user.name,
                email:user.email,

            }

        });

        
        console.log(email,password);
    }catch (error){
        console.log(error);
    }

}
 