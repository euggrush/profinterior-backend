'use strict';

const Joi = require(`joi`);

const {
    HttpCode
} = require(`../constants`);

const ErrorProjectMessage = {
    CATEGORIES: `Не выбрана категория`,
    TITLE_MIN: `Заголовок содержит меньше 1 символов`,
    TITLE_MAX: `Заголовок не может содержать более 100 символов`,
    DESCRIPTION_MIN: `Описание содержит меньше 5 символов`,
    DESCRIPTION_MAX: `Заголовок не может содержать более 1000 символов`
};

const schema = Joi.object({
    categories: Joi.array().items(
        Joi.number().integer().positive().messages({
            'number.base': ErrorProjectMessage.CATEGORIES
        })
    ).min(1).required(),
    title: Joi.string().min(1).max(100).required().messages({
        'string.min': ErrorProjectMessage.TITLE_MIN,
        'string.max': ErrorProjectMessage.TITLE_MAX
    }),
    description: Joi.string().min(5).max(1000).required().messages({
        'string.min': ErrorProjectMessage.DESCRIPTION_MIN,
        'string.max': ErrorProjectMessage.DESCRIPTION_MAX
    })
});

module.exports = (req, res, next) => {
    const newProject = req.body;
    const {
        error
    } = schema.validate(newProject, {
        abortEarly: false
    });

    if (error) {
        return res.status(HttpCode.BAD_REQUEST)
            .send(error.details.map((err) => err.message).join(`\n`));
    }

    return next();
};