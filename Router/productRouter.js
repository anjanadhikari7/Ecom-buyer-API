import express from "express";
import { getProduct, getProducts } from "../Model/productModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../Utility/responseHelper.js";
const productRouter = express.Router();

// GET A PRODUCT
productRouter.get("/:sku", async (req, res) => {
  try {
    const product = await getProduct(req.params.sku);

    product?._id
      ? buildSuccessResponse(res, product, "Product")
      : buildErrorResponse(res, "Could not fetch data");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

// PUBLIC ROUTE
// GET ALL PRODUCTS
productRouter.get("/", async (req, res) => {
  try {
    const products = await getProducts();

    products?.length
      ? buildSuccessResponse(res, products, "Products")
      : buildErrorResponse(res, "Could not fetch data");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

export default productRouter;
