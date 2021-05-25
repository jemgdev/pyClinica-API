const Administrator = require("../models/Administrator");
const jwt = require("jsonwebtoken");
const AdministratorController = {};

const handleErrors = (error) => {
  console.log(error.message, error.code);

  let errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "Correo ya exite";
  }

  if (error.errors.email) {
    errors.email = "Correo incorrecto";
  }

  if (error.message === "Contraseña incorrecta") {
    errors.password = "Contraseñaa incorrecta";
  }

  return errors;
};

AdministratorController.listAdministrator = async (req, res) => {
  const administratorFound = await Administrator.find().select({
    "password": 0,
    "createdAt": 0,
    "updatedAt": 0
  })
  res.json(administratorFound);
};

AdministratorController.loginAdministrator = async (req, res) => {
  const { email, password } = req.body;

  const administratorFound = await Administrator.findOne({ email });
  if (administratorFound) {
    try {
      if (await Administrator.login(password, administratorFound.password)) {
        const token = await jwt.sign(
          { id: administratorFound._id },
          process.env.SECRET_KEY,
          {
            expiresIn: 60 * 60 * 24,
          }
        );

        res.status(200).json({
          auth: true,
          token,
        });
      } else {
        res.status(200).json({
          auth: false,
        });
      }
    } catch (error) {
      res.status(404).json({
        error: "Constraseña incorrecta",
      });
    }
  } else {
    res.status(404).json({
      error: "El correo no esta registrado",
    });
  }
};

AdministratorController.insertAdministrator = async (req, res) => {
  const {
    name,
    surname_p,
    surname_m,
    email,
    password,
    phone,
    dni,
    gender,
    age,
  } = req.body;
  const administratorSchema = new Administrator({
    name,
    surname_p,
    surname_m,
    email,
    password,
    phone,
    dni,
    gender,
    age,
  });
  try {
    await administratorSchema.save();
    res.json({ message: "Administrador registrado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

AdministratorController.changePersonalInformation = async (req, res) => {
  const { name, surname_p, surname_m, phone, dni, gender, age } = req.body;

  try {
    await Administrator.findByIdAndUpdate(
      req.id,
      {
        name,
        surname_p,
        surname_m,
        phone,
        dni,
        gender,
        age,
      },
      {
        new: true,
      }
    );

    res.status(201).json({ message: "Datos actualizados correctamente" });
  } catch (error) {
    res.status(500).json({
      error: handleErrors(error),
    });
  }
};

AdministratorController.changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  const administratorFound = await Administrator.findById(req.id);

  try {
    if (await Administrator.login(password, administratorFound.password)) {
      await Administrator.findByIdAndUpdate(
        req.id,
        {
          password: await Administrator.changePassword(newPassword),
        },
        {
          new: true,
        }
      );

      res.status(201).json({ message: "Contraseña actualizada correctamente" });
    } else {
      res.status(200).json({
        error: "Las contraseñas son diferentes",
      });
    }
  } catch (error) {
    res.status(200).json({ error: "Contraseña incorrecta" });
  }
};

AdministratorController.InfoAdministratorById = async (req, res) => {
  try {
    const administratorGet = await Administrator.findById(req.id, {
        password: 0,
        createdAt: 0,
        updatedAt: 0
    });
    
    res.status(201).json(administratorGet);
  } catch (error) {
    res.error.json(administratorGet);
  }
};

module.exports = AdministratorController;
