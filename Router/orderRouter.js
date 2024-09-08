import express from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../Utility/responseHelper.js";
import { createOrder, getOrders } from "../Model/orderModel.js";
import { UserAuth } from "../Middleware/authMiddleware/authMiddleware.js";

const orderRouter = express.Router();

// GET Orders by user
orderRouter.get("/", UserAuth, async (req, res) => {
  try {
    const user = req.userInfo;
    console.log(user);

    const orders = await getOrders();
    const userId = user._id.toString(); // Convert to string

    const filteredOrders = orders?.filter(
      (order) => order.userId.toString() === userId // Compare strings
    );

    console.log(filteredOrders);

    orders?.length
      ? buildSuccessResponse(res, filteredOrders, "Orders for the user")
      : buildErrorResponse(res, "No orders available");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

// Create order

orderRouter.post("/", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    return order?._id
      ? buildSuccessResponse(res, order, "Order created successfully")
      : buildErrorResponse(res, error.message);
  } catch (error) {
    buildErrorResponse(res, error.message);
  }
});
export default orderRouter;
