import mongoose, { Document, Schema } from "mongoose";

/**
 * Interface for the Voucher model, extending Mongoose's Document.
 * This interface defines the shape of a Voucher document in the MongoDB collection.
 */
interface IVoucher extends Document {
  title: string;
  subtitle: string;
  description: string;
  points: number;
  slots: number;
  acceptedBy: mongoose.Schema.Types.ObjectId[];
  userStatuses: {
    userId: mongoose.Schema.Types.ObjectId;
    status: "pending" | "approval" | "completed" | "cancelled";
  }[]; // Track status per user
  status: "pending" | "approval" | "completed" | "cancelled"; // Global Voucher status
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Mongoose schema for the Voucher model.
 */
const voucherSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    slots: {
      type: Number,
      required: true,
    },
    acceptedBy: {
      type: [mongoose.Schema.Types.ObjectId], // Store only user IDs
      default: [],
    },
    userStatuses: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "approval", "completed", "cancelled"],
          default: "pending", // Default status is 'pending'
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approval", "completed", "cancelled"],
      default: "pending", // Default status is 'pending'
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Voucher = mongoose.model<IVoucher>("Voucher", voucherSchema);

export default Voucher;
