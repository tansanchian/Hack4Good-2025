import mongoose, { Document, Mongoose } from "mongoose";

interface ITransaction extends Document {
    userId: string
    productId: mongoose.Types.ObjectId
    amount: number
    createdAt: Date
}

const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
);

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema);
export { transactionSchema, ITransaction };
export default Transaction;