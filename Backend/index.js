import express, { json } from "express";
import cors from "cors";
import { pool } from "./database/connection.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { verifyToken } from "./middleware/tokenMiddleware.js";
import userRoute from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(json());
app.use("/", userRoute);

app.get("/usuarios", verifyToken, async (req, res) => {
  try {
    const [_, token] = req.headers.authorization.split(" ");
    const query = "SELECT * FROM usuarios WHERE email = $1;";
    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    const { rows } = await pool.query(query, [email]);
    const user = rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ message: "usuario no encontrado", code: 404 });
    }
    res.status(200).json([user]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
