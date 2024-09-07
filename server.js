import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectToMongoDb } from "./config/dbconfig.js";
import categoryRouter from "./Router/categoryRouter.js";
import productRouter from "./Router/productRouter.js";
import userRouter from "./Router/userRouter.js";
import orderRouter from "./Router/orderrouter.js";
import Stripe from "stripe";
const app = express();
const PORT = process.env.PORT || 8001;

// Middleware

app.use(cors());

app.use(express.json());

// Connect to database
connectToMongoDb();
//STRIPE Integration

const stripe = new Stripe(process.env.STRIPE_API_KEY);
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "aud",
      payment_method: "pm_card_mastercard",
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});
// Routes

app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

// Start server
app.listen(PORT, (error) => {
  error
    ? console.log("Error", error)
    : console.log("Server is Running at http://localhost:" + PORT);
});
