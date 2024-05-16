import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const register = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  try {
    await userModel.create({
      email,
      password: bcrypt.hashSync(password),
      rol,
      lenguage,
    });

    if (error.code === "23505") {
      return res.status(400).json({ message: "User already exists" });
    }
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
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

export const userController = { register, login };
