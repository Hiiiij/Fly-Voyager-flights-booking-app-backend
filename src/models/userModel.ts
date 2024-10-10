import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
    id: number;
    name: string;
    email: string;
}

export const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type:Number
    },
    createdAt: {
        type: Date,
    }
})

userSchema.pre('save', (next) => {
    console.log('Saving data to db...');
    next();
})

const User  = mongoose.model<IUser>('User', userSchema)
export default User;