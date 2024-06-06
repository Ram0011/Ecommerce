import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        //validations
        if (!name) return res.send({ message: "Name is required!" });
        if (!email) return res.send({ message: "Email is required!" });
        if (!password) return res.send({ message: "Password is required!" });
        if (!phone) return res.send({ message: "Phone is required!" });
        if (!address) return res.send({ message: "Address is required!" });
        if (!answer) return res.send({ message: "Answer is required!" });

        //check existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered please login",
            });
        }

        //register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
            answer,
        }).save();
        res.status(201).send({
            success: true,
            message: "User Registered Sucessfully!",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

//Post login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validations
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered!",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        //token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};

//test controller
export const testController = (req, res) => {
    res.send("Protected Route");
};

//forgot password
export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email)
            return res.status(400).send({ message: "Email is required!" });
        if (!answer)
            return res.status(400).send({ message: "Answer is required!" });
        if (!newPassword)
            return res
                .status(400)
                .send({ message: "New Password is required!" });

        //check
        const user = await userModel.findOne({ email, answer });
        //validation
        if (!user)
            return res
                .status(404)
                .send({ success: false, message: "Wrong email or answer!" });

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        return res
            .status(200)
            .send({ success: true, message: "Password Reset Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in forgotPasswordController",
            error,
        });
    }
};

export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({
                error: "password in required and 6 character long",
            });
        }
        const hashedPassword = password ? hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile, updated sucessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Error while updating profile",
            error,
        });
    }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
        const order = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.status(200).send({
            success: true,
            message: "Orders retrieved successfully",
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error,
        });
    }
};

//get all orders
export const getAllOrdersController = async (req, res) => {
    try {
        const order = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: "Orders retrieved successfully",
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating orders",
            error,
        });
    }
};
