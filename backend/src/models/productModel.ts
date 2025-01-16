import e from "cors";
import mongoose, { Document } from "mongoose";

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    countInStock: number;
    imageUrl: string;
}

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        countInStock: {
            type: Number,
            required: true,
        },
        imageUrl: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model<IProduct>('Product', productSchema)
export { productSchema, IProduct };
export default Product;