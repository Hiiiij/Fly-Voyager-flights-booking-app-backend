import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const flightSchema = Joi.object({
    origin: Joi.string().required().messages({
        'string.base': 'Origin must be a string',
        'any.required': 'Origin is required'
    }),
    destination: Joi.string().required().messages({
        'string.base': 'Destination must be a string',
        'any.required': 'Destination is required'
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a Number',
        'any.required': 'Price is required'
    }),
    userId: Joi.string().required().messages({
        'string.base': 'userID must be a string',
        'any.required': 'userID is required'
    })
});

const validator = (req: Request, res: Response, next: NextFunction) => {
    const {error} = flightSchema.validate(req.body);
    console.log("validator fx")
    if(error) {
        return res.status(400).send(error);
    }
    next();
}

export default validator;