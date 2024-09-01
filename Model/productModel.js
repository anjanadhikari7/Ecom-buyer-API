import productSchema from "../Schema/productSchema.js";

// GET PRODUCT BY sku
export const getProduct = (sku) => {
  return productSchema.findOne({ sku });
};

// GET ALL PRODUCTS
export const getProducts = () => {
  return productSchema.find();
};
