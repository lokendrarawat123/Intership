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
      "insert into teacher(name,email,position,phone) values(?,?,?,?)",
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
    const changeData = req.body.data;

    // 1️⃣ check if teacher exist
    const [teacher] = await db.execute("SELECT * FROM teacher WHERE id = ?", [
      id,
    ]);
    if (teacher.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const oldTeacher = teacher[0];

    // 2️⃣ Check email duplication if email is changed
    if (changeData.email && changeData.email !== oldTeacher.email) {
      const [existingEmail] = await db.execute(
        "SELECT id FROM teacher WHERE email = ?",
        [changeData.email]
      );
      if (existingEmail.length > 0) {
        return res
          .status(409)
          .json({ message: "Email already exists, use another email" });
      }
    }

    // 3️⃣ Prepare dynamic fields for update
    const fields = [];
    const values = [];

    Object.keys(changeData).forEach((key) => {
      if (
        changeData[key] !== undefined &&
        changeData[key] !== oldTeacher[key]
      ) {
        fields.push(`${key} = ?`);
        values.push(changeData[key]);
      }
    });

    if (fields.length === 0) {
      // return res.status(400).json({ message: "No fields to update" });
    }

    values.push(id); // Add id as last parameter for WHERE clause

    const sql = `UPDATE teacher SET ${fields.join(", ")} WHERE id = ?`;

    // 4️⃣ Execute update
    await db.execute(sql, values);

    res.status(200).json({ message: `Teacher ${id} updated successfully` });
  } catch (error) {
    next(error);
  }
};
