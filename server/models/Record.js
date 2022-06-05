import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
        creatorId: {
            type: ObjectID,
            required: true
        },
        locationId: {
            type: ObjectID
        },
        confirmedByUserID: {
            type:ObjectID
        },
        type: {
            type:String
        },
        severity: {
            type:int
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