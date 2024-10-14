import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const flightSchema = Joi.object({
  flight_date: Joi.date().optional().messages({
    "date.base": "Flight date must be a valid date",
  }),
  return_date: Joi.date().optional().messages({
    "date.base": "Return date must be a valid date",
  }),
  flight_status: Joi.string().required().messages({
    "string.base": "Flight status must be a string",
    "any.required": "Flight status is required",
  }),
  departure: Joi.object({
    airport: Joi.string().required().messages({
      "string.base": "Departure airport must be a string",
      "any.required": "Departure airport is required",
    }),
    iata: Joi.string().required().messages({
      "string.base": "Departure IATA must be a string",
      "any.required": "Departure IATA is required",
    }),
    scheduled: Joi.date().optional().messages({
      "date.base": "Scheduled departure must be a valid date",
    }),
  }).required(),
  arrival: Joi.object({
    airport: Joi.string().required().messages({
      "string.base": "Arrival airport must be a string",
      "any.required": "Arrival airport is required",
    }),
    iata: Joi.string().required().messages({
      "string.base": "Arrival IATA must be a string",
      "any.required": "Arrival IATA is required",
    }),
    scheduled: Joi.date().optional().messages({
      "date.base": "Scheduled arrival must be a valid date",
    }),
  }).required(),
  airline: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "Airline name must be a string",
      "any.required": "Airline name is required",
    }),
    iata: Joi.string().required().messages({
      "string.base": "Airline IATA must be a string",
      "any.required": "Airline IATA is required",
    }),
  }).required(),
  flight: Joi.object({
    number: Joi.string().required().messages({
      "string.base": "Flight number must be a string",
      "any.required": "Flight number is required",
    }),
    iata: Joi.string().required().messages({
      "string.base": "Flight IATA must be a string",
      "any.required": "Flight IATA is required",
    }),
  }).required(),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),
  duration: Joi.number().required().messages({
    "number.base": "Duration must be a number",
    "any.required": "Duration is required",
  }),
  trip_type: Joi.string().valid("one_way", "round_trip").required().messages({
    "any.only": "Trip type must be either 'one_way' or 'round_trip'",
    "any.required": "Trip type is required",
  }),
  class: Joi.string().valid("Economy", "Business", "First").required().messages({
    "any.only": "Class must be either 'Economy', 'Business', or 'First'",
    "any.required": "Class is required",
  }),
});

const validator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = flightSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  next();
};

export default validator;
