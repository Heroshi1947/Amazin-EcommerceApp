import express from "express";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable"; // helps in uploading any document including photos easily

const router = express.Router();

//--------------------------------------------- ROUTES ---------------------------------------------------//

// ==========================   create-products ========================
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//============================  update-routes  ==========================
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//============================ get products  ============================
router.get("/all-products", getProductController);

//============================ single product ============================
router.get("/get-product/:slug", getSingleProductController);

//============================ get photo ================================
router.get("/product-photo/:pid", productPhotoController);

//============================ delete product ============================
router.delete("/delete-product/:pid", deleteProductController);

//============================ filter product ============================
router.post("/product-filters", productFiltersController);

//============================ product count ============================
router.get("/product-count", productCountController);

//=========================== product per page ============================
router.get("/product-list/:page", productListController);

//============================ search product ============================
router.get("/search/:keyword", searchProductController);

//============================ similar product ============================
router.get("/related-product/:pid/:cid", relatedProductController);

// //category wise product
router.get("/product-category/:slug", productCategoryController);

// //payments routes
// //token
router.get("/braintree/token", braintreeTokenController);

// //payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
