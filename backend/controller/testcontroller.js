import db from "../config/dbconnection.js";

export  const testcontroller =(req,res)=>{
    res.send("hello kabi ko budi")
}
export const callme= async(req,res)=>{
   try {
    const [user]=await db.query("SELECT * FROM users");
    res.status(200).json({
        data:user,
    })
   } catch (error) {
    console.log(error);
   }
}
