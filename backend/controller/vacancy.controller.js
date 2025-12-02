import db from "../config/dbconnection.js";

export const addVacancy = async (req, res, next) => {
  try {
    const { position, discription, deadline } = req.body;
    console.log(req.body);
    if (!position || !discription || !deadline) {
      return res.status(400).jsoyata({
        message: "all fields are requried ",
      });
    }
    await db.execute(
      "insert into vacancy (position,discription,deadline) values(?,?,?)",
      [position, discription, deadline]
    );
    res.status(200).json({
      message: "vacancy added success successfully",
    });

    // const [addvacancy] = await db.execute("insert into vacancy ")
  } catch (error) {
    next(error);
  }
};

export const getVacancy = async (req, res, next) => {
  try {
    const [allVacancy] = await db.execute("select * from vacancy ");
    res.status(200).json({
      message: "sucsesfully displayed",
      data: allVacancy,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteVacancy = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    const [existingId] = await db.execute(
      "select id,  position from vacancy where id=?",
      [id]
    );
    const data = existingId[0];
    console.log(data);

    if (existingId.length === 0) {
      return res.status(400).json({
        message: `vacancy  is  not found with this  id :${id} `,
      });
    }
    await db.execute("delete from vacancy where id=? ", [id]);
    res.status(200).json({
      message: `delete succesfully  vacancy of this ${data.position}  `,
    });
  } catch (error) {
    next(error);
  }
};
