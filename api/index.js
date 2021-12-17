const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const filterRoute = require("./routes/filter");
const cartRoute = require("./routes/cart");
const stripeRoute = require("./routes/stripe");
const orderRoute = require("./routes/order");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/filter", filterRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
});