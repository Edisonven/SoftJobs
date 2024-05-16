import express, { json } from "express";
import cors from "cors";
import "dotenv/config";

import userRoute from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(json());
app.use("/", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
