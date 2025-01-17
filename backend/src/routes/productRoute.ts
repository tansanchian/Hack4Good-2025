// External libraries
import { Router } from "express";

// Internal libraries
import {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController";
import { adminProtectRoute, protectRoute } from "../middlewares/protectRoute";

const router: Router = Router();

router.get('/', protectRoute, getAllProducts);

router.get('/:id', protectRoute, getProduct);

router.post('/', protectRoute, adminProtectRoute, createProduct);

router.patch("/update", protectRoute, adminProtectRoute, updateProduct);

router.delete("/:id", protectRoute, adminProtectRoute, deleteProduct);

export default router;