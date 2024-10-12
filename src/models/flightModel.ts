import mongoose, { Schema, Document } from "mongoose";
// Flight interface to define the structure of a flight
export interface IFlight extends Document {
  origin: string;
  destination: string;
  price: number;
}

export const flightSchema = new Schema({
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Flight = mongoose.model<IFlight>("Flight", flightSchema);

export default Flight;
