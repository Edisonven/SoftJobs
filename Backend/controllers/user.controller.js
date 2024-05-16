import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;

  try {
    const existingUser = await userModel.findUser(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    await userModel.create({
      email,
      password: bcrypt.hashSync(password),
      rol,
      lenguage,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      code: 500,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUser(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const credentialMatch = bcrypt.compareSync(password, user.password);
    if (!credentialMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      email: user.email,
      rol: user.rol,
      lenguage: user.lenguage,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      message: "Login successfully",
      token,
      email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      code: 500,
    });
  }
};

const checkUserToken = async (req, res) => {
  try {
    const [_, token] = req.headers.authorization.split(" ");
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findUser(email);
    if (!user) {
      return res
        .status(404)
        .json({ message: "usuario no encontrado", code: 404 });
    }
    res.status(200).json([user]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      code: 500,
    });
  }
};

export const userController = { register, login, checkUserToken };
