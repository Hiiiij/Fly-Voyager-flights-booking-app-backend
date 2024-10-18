import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const flightSchema = Joi.object({
  date: Joi.date().optional(),
  status: Joi.string().required(),
  departure: Joi.object({
    airport: Joi.string().hex().length(24).required(), 
  }).required(),
  arrival: Joi.object({
    airport: Joi.string().hex().length(24).required(),  
    scheduled: Joi.date().optional(),
  }).required(),
  airline: Joi.object({
    name: Joi.string().required(),
    iata: Joi.string().length(2).required(),  
  }).required(),
  price: Joi.number().required(),
  duration: Joi.number().required(),
});
const airportSchema = Joi.object({ 
  name: Joi.string().required(),
  iata: Joi.string().length(3).required()
});

export const airportValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = airportSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      error: "Validation Error",
      details: errorMessages,
    });
  }
  next();
};

export const flightValidator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = flightSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
      const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      error: "Validation Error",
      details: errorMessages,
    });
  }
  next();
};




