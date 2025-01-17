// External libraries
import { Router } from "express";

// Internal project modules
import {
  createVoucher,
  acceptVoucher,
  getAvailableVouchers,
  completeVoucher,
  deleteVoucher,
  adminApproveRejectVoucher,
  updateVoucher,
  getUserVoucher,
  getAllVoucher,
} from "../controllers/voucherController";
import { adminProtectRoute, protectRoute } from "../middlewares/protectRoute";

const router: Router = Router();
/**
 * @route GET /
 * @description Retrieves all voucher
 * @access Protected (Normal User)
 *
 * Requires the user to be authenticated. Returns user data for the given user ID.
 */
router.get("/", protectRoute, getAvailableVouchers);
router.get("/getAllVoucher", protectRoute, adminProtectRoute, getAllVoucher);

/**
 * @route POST /
 * @description Creates a Voucher
 * @access Public
 *
 * Endpoint to create a new user with the provided username, email, and password.
 * This route is not protected as it is intended for new users to register.
 */
router.post("/create", protectRoute, adminProtectRoute, createVoucher);

/**
 * @route GET /getUserVoucher
 * @description Retrieves all voucher
 * @access Protected (Normal User)
 *
 * Requires the user to be authenticated. Returns user data for the given user ID.
 */
router.post("/getUserVoucher", getUserVoucher);

/**
 * @route GET /
 * @description Retrieves all users
 * @access Protected (Normal User)
 *
 * Requires the user to be authenticated. Returns a list of all users in the database.
 */
router.patch("/acceptVoucher", protectRoute, acceptVoucher);

/**
 * @route PATCH /update
 * @description Updates the authenticated user's information
 * @access Protected (Normal User)
 *
 * Requires the user to be authenticated. Allows the user to update their own profile information.
 */
router.patch("/complete", protectRoute, completeVoucher);

/**
 * @route DELETE /:id
 * @description Deletes a specific user by ID
 * @access Protected (Normal User)
 *
 * Requires the user to be authenticated. Deletes the user with the specified ID.
 */
router.patch("/delete", protectRoute, adminProtectRoute, deleteVoucher);
router.patch("/update", protectRoute, adminProtectRoute, updateVoucher);

/**
 * Admin-Protected Routes
 *
 * This route is restricted to admin users only. The `adminProtectRoute` middleware
 * is used in addition to `protectRoute` to ensure the user is both authenticated and has admin privileges.
 */

/**
 * @route PATCH /:id/privilege
 * @description Updates the privilege level of a specific user by ID
 * @access Protected (Admin Only)
 *
 * Allows admin users to update the privilege level of a specific user.
 *
 * Body:
 * - `isAdmin` (boolean): Specifies whether the user should be granted admin privileges.
 */
router.patch(
  "/approveRejectVoucher",
  protectRoute,
  adminProtectRoute,
  adminApproveRejectVoucher
);

export default router;
