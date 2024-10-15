import { ref } from "joi";
import mongoose, { Schema, Document, ObjectId } from "mongoose";
interface IFlight extends Document {
  date?: Date;
  status: string;
  iata: string;

  departure: {
    scheduled?: Date;
    airport: ObjectId;
  };
  arrival: {
    scheduled?: Date;
    airport: ObjectId;
  };
  airline: {
    name: string;
    iata: string;
  };
  price: number;
  duration: number; // Flight duration in minutes
}

interface IAirport extends Document {
  name: string;
  iata: string;
}

const flightSchema = new Schema({
  date: { type: Date, default: Date.now },
  status: { type: String, default: "scheduled" },
  iata: { type: String, required: true },
  departure: {
    airport: { type: Schema.Types.ObjectId, ref: "Airport", required: true },
    scheduled: { type: Date, required: false },
  },
  arrival: {
    airport: { type: Schema.Types.ObjectId, ref: "Airport", required: true },
    scheduled: { type: Date, required: false },
  },
  airline: {
    name: { type: String, required: true },
    iata: { type: String, required: true },
  },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true },
});

const airportSchema = new Schema({
  name: { type: String, required: true },
  iata: { type: String, required: true, unique: true },
});

const Airport = mongoose.model<IAirport>("Airport", airportSchema);

const Flight = mongoose.model<IFlight>("Flight", flightSchema);

export default Flight;
