import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
            },
        ],
        payment: { type: String, enum: ["cod", "card"] },
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        status: {
            type: String,
            default: "Processing",
            enum: ["Cancelled", "Processing", "Succesful", "Delivered"],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
