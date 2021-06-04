const Administrator = require("../models/Administrator");
const jwt = require("jsonwebtoken");
const AdministratorController = {};

const handleErrors = (error) => {
  console.log(error.message, error.code);

  let errors = {
    name: "",
    fatherLastName: "",
    motherLastName: "",
    email: "",
    password: "",
  };

  if (error.code === 11000) {
    errors.email = "El correo ya existe";
  }

  if (error.errors) {
    if (error.errors.name) {
      errors.name = "Tienes que ingresar un nombre";
    }

    if (error.errors.surname_p) {
      errors.fatherLastName = "Tienes que ingresar un apellido paterno";
    }

    if (error.errors.surname_m) {
      errors.motherLastName = "Tienes que ingresar un apellido materno";
    }

    if (error.errors.email) {
      errors.email = "Correo incorrecto";
    }
  }

  if (error.message === "Password is wrong") {
    errors.password = "La contraseña es incorrecta";
  }

  return errors;
};

//listar todos los administradores
AdministratorController.listAdministrator = async (req, res) => {
  const administratorFound = await Administrator.find().select({
    password: 0,
    createdAt: 0,
    updatedAt: 0,
  });
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
          message: "El token no ha sido creado",
        });
      }
    } catch (error) {
      res.status(200).json({
        auth: false,
        error: handleErrors(error),
      });
    }
  } else {
    res.status(200).json({
      auth: false,
      message: "El email no esta registrado",
    });
  }
};

//insertar un administrador
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

//actualizar la informacion personal del administrador
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

//actualizar la contraseña del administrador
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

//obtener la informacion del administrador por su id
AdministratorController.InfoAdministratorById = async (req, res) => {
  try {
    const administratorGet = await Administrator.findById(req.id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    res.status(201).json(administratorGet);
  } catch (error) {
    res.error.json(administratorGet);
  }
};

//actualizar el avatar del administrador
AdministratorController.changeAvatar = async (req, res) => {
  const { avatar } = req.body;

  try {
    await Administrator.findByIdAndUpdate(
      req.id,
      {
        avatar,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "El avatar ha sido actualizado correctamente",
    });
  } catch (error) {
    res.status(201).json({
      message: "Hubo un error al actualizar el avatar",
    });
  }
};

module.exports = AdministratorController;
