import express from "express";
import { getCategories } from "../Model/categoryModel.js";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../Utility/responseHelper.js";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await getCategories();

    categories?.length
      ? buildSuccessResponse(res, categories, "Categories")
      : buildErrorResponse(res, "Could not fetch data");
  } catch (error) {
    buildErrorResponse(res, "Could not fetch data");
  }
});

export default categoryRouter;
