import db from "../config/dbconnection.js";
import { removeImg } from "../utils/removeImg.js";

// add teacher Api
export const addTeacher = async (req, res, next) => {
  // console.log(req.user);
  const { role } = req.user;
  // return res.json({ file: req.file }); for image
  try {
    if (role !== "admin") {
      return res.status(403).json({ message: "Acces denied .Admin only" });
    }
    const { name, email, phone, position } = req.body;

    // console.log(name, email, phone, position);
    if (!name || !email || !phone || !position) {
      if (req.file) {
        removeImg(req.file.path);
      }
      res.status(400).json({
        message: "all fields are required.",
      });
    }

    //check first email
    const [existingEmail] = await db.execute(
      "select id from teacher where email=?",
      [email]
    );

    //return message
    if (existingEmail.length > 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      res.status(409).json({
        message: "email is already registerd",
      });
    }
    //check first phone number
    const [existingNumber] = await db.execute(
      "select id from teacher where phone=?",
      [phone]
    );
    //return message
    if (existingNumber.length > 0) {
      if (req.file) {
        removeImg(req.file.path);
      }
      res.status(409).json({
        message: "phone number  is already registerd",
      });
    }
    const imagePath = req.file ? `uploads/teachers/${req.file.filename}` : null;
    await db.execute(
      "insert into teacher(name,email,position,phone,img) values(?,?,?,?,?)",
      [name, email, position, phone, imagePath]
    );
    return res.status(201).json({
      message: "teacher inserted succesfully",
    });
  } catch (error) {
    next(error);
  }
};
// get teacher Api for display all teachers
export const getTeacher = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query; //pagignation
    // console.log((page = 1), (limit = 10));
    page = Number(page); //convet into integer or number
    limit = Number(limit);
    const offset = (page - 1) * limit;
    // console.log(typeof (page, limit));
    const [allTeacher] = await db.execute(
      "select * from teacher order by created_at  desc limit ? offset ?",
      [limit, offset]
    );
    const [[{ total }]] = await db.execute(
      "select count(*) as total from teacher"
    );
    console.log(total);
    res.status(200).json({
      messege: "succesfully displayed",
      data: allTeacher,
      page,
      limit,
      offset,
      total,
      totalPages: Math.ceil(total / limit),
      remainig: total - (offset + limit),
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const [existingId] = await db.execute(
      "select id,img from teacher where id=?",
      [id]
    );
    // res.status(200).json({
    //   id: existingId,
    // });
    if (existingId.length === 0) {
      return res.status(404).json({
        message: `teacher not found with this id : ${id}`,
      });
    }
    if (existingId[0].img) {
      removeImg(`uploads/teachers/${existingId[0].img.split("/").pop()}`);
    }
    await db.execute("delete   from teacher where id=?", [id]);
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
    const changeData = req.body;

    // 1️⃣ check if teacher exist
    const [teacher] = await db.execute(
      "SELECT * FROM teacher orderd by created_at desc WHERE id = ?",
      [id]
    );

    if (teacher.length === 0) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const oldTeacher = teacher[0];

    // 2️⃣ Prepare dynamic fields for update
    const fields = [];
    const values = [];

    // 👉 Handle normal fields from req.body
    Object.keys(changeData).forEach((key) => {
      if (
        changeData[key] !== undefined &&
        changeData[key] !== oldTeacher[key]
      ) {
        fields.push(`${key} = ?`);
        values.push(changeData[key]);
      }
    });

    // 👉 Handle image update
    if (req.file) {
      const newImg = `uploads/teachers/${req.file.filename}`;

      fields.push(`img = ?`);
      values.push(newImg);

      // remove old image if exists
      if (oldTeacher.img) {
        const oldFilename = oldTeacher.img.split("/").pop();
        removeImg(`uploads/teachers/${oldFilename}`);
      }
    }

    // If no fields changed
    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    // Add WHERE ID
    values.push(id);

    const sql = `UPDATE teacher SET ${fields.join(", ")} WHERE id = ?`;

    // 3️⃣ Execute update
    await db.execute(sql, values);

    res.status(200).json({ message: `Teacher ${id} updated successfully` });
  } catch (error) {
    next(error);
  }
};
