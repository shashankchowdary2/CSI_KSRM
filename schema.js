const Joi = require('joi');

module.exports.eventSchema = Joi.object({
    Event : Joi.object({
        title: Joi.string().required(),
        date: Joi.string().required(),
        coordinators: Joi.string().required(),
        rules: Joi.string(),
        winners: Joi.string(),
        photos: Joi.string(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
    }).required()
})
