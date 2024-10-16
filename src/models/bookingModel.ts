import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  id: number;
  user: string;
  flight: string;
  bookingDate: Date;
  status: string;
}

const bookingSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  //relying on API
  flight: {
    type: mongoose.Schema.ObjectId,
    ref: "Flight",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
});

const Booking = mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;


//  trip_type: {
//     type: String,
//     enum: ["one_way", "round_trip"],
//     default: "one_way",
//   },