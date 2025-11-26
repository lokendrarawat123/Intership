import db from "../config/dbconnection.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const dot = process.env.secrete_key;
const expire = process.env.expireTime;
// export  const testcontroller =(req,res)=>{
//     res.send("hello kabi ko budi")
// }
export const getAllusers = async (req, res, next) => {
  try {
    const [user] = await db.query("SELECT * FROM users");
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Login Api
export const login = async (req, res, next) => {
  //1. get email  and password from user side.
  try {
    const { email, password } = req.body;
    // 2 .validation for  login
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    // 3 check user is available in database
    const [result] = await db.execute("select * from users where email =? ", [
      email,
    ]);
    //4 user found ?
    if (result.length === 0) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }
    const user = result[0];
    // check the password of found user.
    const ismatch = await bcryptjs.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    //jwt=jsonwebtoken
    //for genarate token for cookies
    //it takes 3 things
    // i.your details 2.secret key 3. expire time
    const token = await jwt.sign(
      {
        //details
        id: user.id,
        name: user.name,
        email: user.email,
      },
      //secrete key
      dot,
      {
        //expire time
        expiresIn: expire,
      }
    );
    //for storing cookies for login
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    // 4 success
    if (!ismatch) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    res.status(200).json({
      message: "login succesfull",
      user: {
        id: user.id,
        // name: user.name,
        email: user.email,
        //     created_at: user.created_at,
        //     token: token,
      },
    });
  } catch (error) {
    next(error);
  }
};
//get me Api
// export const getMe = async (req, res) => {
//   try {

//   } catch (error) {}
// };
//signout Api
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "succesfully sign out thank you",
    });
  } catch (error) {
    next(error);
  }
};
