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
            unique: true,
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
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model<IProduct>('Product', productSchema)
export { productSchema, IProduct };
export default Product;