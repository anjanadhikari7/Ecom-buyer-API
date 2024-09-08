import productSchema from "../Schema/productSchema.js";

// GET PRODUCT BY sku
export const getProduct = (sku) => {
  return productSchema.findOne({ sku });
};

// GET ALL PRODUCTS
export const getProducts = () => {
  return productSchema.find();
};

//Update Product
export const updateproduct = (updatedObject) => {
  return productSchema.findByIdAndUpdate(updatedObject?._id, updatedObject, {
    new: true,
  });
};
