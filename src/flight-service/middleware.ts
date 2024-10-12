import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const flightSchema = Joi.object({
  origin: Joi.string().required().messages({
    "string.base": "Origin must be a string",
    "any.required": "Origin is required",
  }),
  destination: Joi.string().required().messages({
    "string.base": "Destination must be a string",
    "any.required": "Destination is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a Number",
    "any.required": "Price is required",
  }),
});

const validator = (req: Request, res: Response, next: NextFunction) => {
  const { error } = flightSchema.validate(req.body, { abortEarly: false }); // validate all fields
  console.log("validator fx");

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({
      errors: errorMessages,
    });
  }
  next();
};
export default validator;
