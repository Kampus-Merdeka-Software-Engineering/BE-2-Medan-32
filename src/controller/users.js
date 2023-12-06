const usersModel = require("../models/users");

const getAllUsers = async (req, res) => {
  try {
    //bisa [data,field] tapi karena kita gak ambil field jadi pake data. bisa pake [rows] (destructuring)
    const [data] = await usersModel.getAllUsers();

    res.json({
      message: "GET users Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET users Failed",
      serverMessage: error,
    });
  }
};
const createNewUser = async (req, res) => {
  const { body } = req;

//   if (!body.name || !body.email || !body.password) {
//     res.status(400).json({
//       message: "Bad Request",
//       data: null,
//     });
//   }

  try {
    await usersModel.createNewUser(body);
    res.status(201).json({
      message: "CREATE new users Success",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: "CREATE users Failed",
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { idUser } = req.params;
  const { body } = req;
  try {
    await usersModel.updateUser(body, idUser);
    res.json({
      message: "UPDATE user succes",
      data: {
        id: idUser,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "UPDATE users Failed",
      serverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { idUser } = req.params;
  res.json({
    message: "DELETE user success",
    data: null,
  });
  try {
    await usersModel.deleteUser(idUser);
  } catch (error) {
    res.status(500).json({
      message: "DELETE users Failed",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
