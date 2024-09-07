import express from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../Utility/responseHelper.js";
import { createOrder, getOrders } from "../Model/orderModel.js";

const orderRouter = express.Router();
// GET Orders by user
orderRouter.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await getOrders();
    const filteredOrders = orders?.filter((order) => order.userId === userId);

    orders?.length
      ? buildSuccessResponse(res, filteredOrders, "Orders")
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
