import express from "express";
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routing
//register | POST
router.post("/register", registerController);

//login | POST
router.post("/login", loginController);

//forgot password | POST
router.post("/forgot-password", forgotPasswordController);

//test routes | GET
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth | GET
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({
        ok: true,
    });
});

//protected admin route auth | GET
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({
        ok: true,
    });
});

//update profile | PUT
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//get all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

export default router;
