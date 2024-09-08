import express from "express";
import {
  getProduct,
  getProducts,
  updateproduct,
} from "../Model/productModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../Utility/responseHelper.js";
import { UserAuth } from "../Middleware/authMiddleware/authMiddleware.js";
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

// Update

productRouter.patch("/", UserAuth, async (req, res) => {
  try {
    const product = await updateproduct(req.body);

    product?._id
      ? buildSuccessResponse(res, product, "Product Updated Successfully.")
      : buildErrorResponse(res, "Could not update the product!");
  } catch (error) {
    buildErrorResponse(res, "Could not update data");
  }
});

export default productRouter;
