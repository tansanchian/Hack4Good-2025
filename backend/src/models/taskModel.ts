import mongoose, { Document } from "mongoose";

interface ITask extends Document {
    name: string;
    description: string;
    isCompleted: boolean;
    voucherAmount: number;
}

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false,
        },
        voucherAmount: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model<ITask>('Task', taskSchema)
export { taskSchema, ITask };
export default Task;