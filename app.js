require("dotenv").config();
require("express-async-errors");
const express = require("express");
const router = require("./routes");
const app = express();
const { PORT } = process.env;
const db = require("./models");
const {
  ErrorValidator,
  ErrorResponse,
} = require("./utils/responses/Error.response");

//router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
// db.sequelize.sync({ force: true });

// app.use((err, req, res, next) => {
//   if (err.name === "ValidationError") {
//     res.status(403).json(new ErrorValidator(err));
//   }
//   if (err.name === "SequelizeUniqueConstraintError") {
//     res.status(403).json(new ErrorResponse("Erreur de contrainte", err));
//   }
//   res.status(422).json(new ErrorResponse("Une erreur est survenue", err, 422));
// });
app.listen(PORT);
