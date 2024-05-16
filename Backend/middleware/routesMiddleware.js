import "dotenv/config";
const PORT = process.env.PORT || 3000;

export const checkRoutes = (req, res, next) => {
  const route = req.url;
  const user = req.body.email;
  console.log(
    `Consulta recibida a la siguiente ruta :http://localhost:${PORT}${route} , usuario:`,
    user
  );
  next();
};
