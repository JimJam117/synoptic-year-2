import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        locationId: {
            type: mongoose.Schema.Types.ObjectId
        },
        confirmedByUserID: {
            type:mongoose.Schema.Types.ObjectId
        },
        type: {
            type:String
        },
        severity: {
            type:Number
        },
        details: {
            type: String
        },
        isArchived: {
            type:Boolean,
            required: true,
            default: false
        },
    },
    { timestamps: true }
);

export default mongoose.model("Record", recordSchema);