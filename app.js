import express from "express";
import employeeRoute from "./routes/employeeRoute.js";
const app = express();

function logger(req, res, next) {
  console.log(`${req.method}: ${req.url}`);
  next();
}

app.use(logger);
app.use(express.json());

app.use("/employees", employeeRoute);

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.use((err, req, res, next) => {
  console.error("Middleware Error");
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;
