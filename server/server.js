const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookiesParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");

dotenv.config();

// create a database connection -> you can also
// create a seperate file for this and then import/use file that file

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("mongoDB is connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: " http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "pragma",
    ],
    credentials: true,
  })
);

app.use(cookiesParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
