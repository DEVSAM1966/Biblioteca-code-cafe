import express, { json as jsonMiddleware } from "express";
import { PORT } from "./configuration/env.configuration";

const app = express();

app.use(jsonMiddleware());

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
