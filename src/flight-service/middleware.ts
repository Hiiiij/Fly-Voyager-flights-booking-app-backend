import Joi from "joi";
import { NextFunction, Request, Response } from "express";

const flightSchema = Joi.object({
  date: Joi.date().optional(),
  status: Joi.string().required(),
  departure: Joi.object({
    airport: Joi.string().required(),
    scheduled: Joi.date().optional(),
  }).required(),
  arrival: Joi.object({
    airport: Joi.string().required(),
    scheduled: Joi.date().optional(),
  }).required(),
  airline: Joi.object({
    name: Joi.string().required(),
    iata: Joi.string().required(),
  }).required(),
  price: Joi.number().required(),
  duration: Joi.number().required(),
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
