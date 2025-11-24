import db from "../config/dbconnection.js";

// add teacher Api
export const addTeacher = async (req, res, next) => {
  try {
    const { name, email, phone, position } = req.body;
    // console.log(name, email, phone, position);
    if (!name || !email || !phone || !position) {
      return res.status(400).json({
        messege: "all fields are required.",
      });
    }
    //check first email
    const [existingEmail] = await db.execute(
      "select id from teacher where email=?",
      [email]
    );

    //return message
    if (existingEmail.length > 0) {
      res.status(409).json({
        messege: "email is already registerd",
      });
    }
    //check first phone number
    const [existingNumber] = await db.execute(
      "select id from teacher where phone=?",
      [phone]
    );
    //return message
    if (existingNumber.length > 0) {
      res.status(409).json({
        messege: "phone number  is already registerd",
      });
    }
    await db.execute(
      "insert into teacher(name,email,possition,phone) values(?,?,?,?)",
      [name, email, position, phone]
    );
    return res.status(201).json({
      messege: "teacher inserted succesfully",
    });
  } catch (error) {
    next(error);
  }
};
// get teacher Api for display all teachers
export const getTeacher = async (req, res, next) => {
  try {
    const [allTeacher] = await db.execute("select * from teacher");
    res.status(200).json({
      messege: "succesfully displayed",
      data: allTeacher,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const [existingId] = await db.execute("select id from teacher where id=?", [
      id,
    ]);
    // res.status(200).json({
    //   id: existingId,
    // });
    if (existingId.length === 0) {
      return res.status(404).json({
        message: `teacher not found with this id : ${id}`,
      });
    }
    await db.execute("delete from teacher where id=?", [id]);
    return res.status(200).json({
      message: `teacher deleted successfully with id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    // console.log(req.body);
    const { name, email, position, phone } = req.body;
    // console.log(req.body);
    //1. check if teacher exist
    const [teacher] = await db.execute("select * from teacher where id = ?", [
      id,
    ]);
    // console.log(teacher);
    if (teacher.length === 0) {
      return res.status(404).json({
        message: "teacher not found",
      });
    }
    //check existing email
    const [existingEmail] = await db.execute(
      "select email from teacher where email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(404).json({
        message: "email is already exist, use another email",
      });
    }
    const oldTeacher = teacher[0];
    // console.log(teacher[0]);

    // if teacher exist update the teacher details
    await db.execute(
      "update teacher set name=?,email=?,phone=?,possition=? where id=?",
      [
        name ?? oldTeacher.name,
        email ?? oldTeacher.email,
        phone ?? oldTeacher.phone,
        position ?? oldTeacher.position,
        id,
      ]
    );
    res.status(200).json({ message: `this ${id} is succesfully updated` });
    console.log(oldTeacher);
  } catch (error) {
    next(error);
  }
};
