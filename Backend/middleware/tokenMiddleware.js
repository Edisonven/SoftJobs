import "dotenv/config";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const autorizacionHeader = req.headers.authorization;
  if (!autorizacionHeader) {
    return res.status(401).json({ message: "token inválido" });
  }

  const [bearer, token] = autorizacionHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Autorización inválida" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET) && next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ message: "token no válido, intenta nuevamente" });
  }
};
