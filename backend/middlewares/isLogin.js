//get me
export const isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(401).json({
        message: " sorry, login first :you are not login",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
