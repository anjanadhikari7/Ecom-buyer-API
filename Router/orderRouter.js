import express from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../Utility/responseHelper.js";

const orderRouter = express.Router();
// GET Orders by user
orderRouter.get("/", async (req, res) => {
  try {
    const orders = await getOrders();

    orders?.length
      ? buildSuccessResponse(res, orders, "Orders")
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
