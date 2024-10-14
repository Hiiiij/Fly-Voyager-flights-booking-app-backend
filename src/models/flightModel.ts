import mongoose, { Schema, Document } from "mongoose";

// export interface IFlight extends Document {
//   origin: string;
//   destination: string;
//   price: number;
// }

// export const flightSchema = new Schema({
//   origin: {
//     type: String,
//     required: true,
//   },
//   destination: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
// });

// const Flight = mongoose.model<IFlight>("Flight", flightSchema);

// export default Flight;

export interface IFlight extends Document {
  flight_date?: Date;
  return_date?: Date;
  flight_status: string;
  departure: {
    airport: string;
    iata: string;
    scheduled?: Date;
    arrival: {
      airport: string;
      iata: string;      // unique id
      scheduled?: Date;
    };
    airline: {
      name: string;
      iata: string;     // unique id
    };
    flight: {
      iata: string;     // unique id
    };
    price: number;
    duration: number;    // Flight duration in minutes
    trip_type: 'one_way' | 'round_trip';
    class: 'Economy' | 'Business' | 'First';
  }
}



export const flightSchema = new Schema({
  flight_date: { type: Date, default: Date.now },  
  return_date: { type: Date, required: false },
  flight_status: { type: String, default: 'scheduled' },
  departure: {
    airport: { type: String, required: true }, 
    iata: { type: String, required: true },  
    scheduled: { type: Date, required: false },
  },
  arrival: {
    airport: { type: String, required: true }, 
    iata: { type: String, required: true },  
    scheduled: { type: Date, required: false },  
  },
  airline: {
    name: { type: String, required: true },    
    iata: { type: String, required: true },     
  },
  flight: {
    iata: { type: String, required: true },    
  },
  price: { type: Number, required: true, min: 0 },
  duration: { type: Number, required: true }, 
  trip_type: { type: String, enum: ['one_way', 'round_trip'], default: 'one_way' },  
  class: { type: String, enum: ['Economy', 'Business', 'First'], default: 'Economy' },
});


const Flight = mongoose.model<IFlight>('Flight', flightSchema);


export default Flight;

