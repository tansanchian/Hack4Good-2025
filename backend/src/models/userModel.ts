import mongoose, { Document, Schema } from "mongoose";

/**
 * Interface for the User model, extending Mongoose's Document.
 * This interface defines the shape of a User document in the MongoDB collection
 * and helps TypeScript with type-checking and autocompletion.
 */
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  numberOfFailedLoginAttempts: number;
  passwordResetToken?: string;
  passwordResetTokenExpiration?: Date;
  isAdmin: boolean;
  acceptedVouchers: mongoose.Schema.Types.ObjectId[]; // Array of Voucher IDs the user has accepted
  userStatuses: Array<{
    voucherId: mongoose.Schema.Types.ObjectId;
    status: "pending" | "approval" | "completed" | "cancelled";
  }>; // User's status for each voucher
}

/**
 * Mongoose schema for the User model.
 * Defines the structure, data types, and validation for each field.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Setting default to the current date/time
    },
    numberOfFailedLoginAttempts: {
      type: Number,
      default: 0,
      required: true,
    },
    passwordResetToken: {
      type: String,
      required: false,
    },
    passwordResetTokenExpiration: {
      type: Date,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    acceptedVouchers: {
      type: [mongoose.Schema.Types.ObjectId], // Store voucher IDs
      default: [], // Empty array by default, referencing Voucher model
    },
    userStatuses: {
      type: [
        {
          voucherId: { type: mongoose.Schema.Types.ObjectId, ref: "Voucher" }, // Reference to Voucher model
          status: {
            type: String,
            enum: ["pending", "approval", "completed", "cancelled"],
            default: "pending",
          }, // Status of the voucher for this user
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * User Model
 * This is the model that interacts with the MongoDB 'User' collection.
 */
const User = mongoose.model<IUser>("User", userSchema);

export default User;
