import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type:String
        },
        description: {
            type:String
        },
        coordinates: {
            type:String,
            required:true,
            unique: true,
        },
        isArchived: {
            type:Boolean,
            required: true,
            default: false
        },
    },
    { timestamps: true }
);

export default mongoose.model("Location", locationSchema);