import "dotenv/config";
const PORT = process.env.PORT || 3000;
const HOST = process.env.PGHOST || "localhost";

export const checkRoutes = (req, res, next) => {
  const route = req.url;
  const user = req.body.email;
  console.log(
    `Consulta recibida a la siguiente ruta :http://${HOST}:${PORT}${route} , usuario:`,
    user
  );
  next();
};
