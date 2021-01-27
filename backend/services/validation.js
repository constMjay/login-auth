const Joi = require('joi')

const validateFormRegister = (form) => {
    const schema = Joi.object({
        email: Joi.string().required().min(3),
        password: Joi.string().required().min(5)
    });
    return schema.validate(form)
}
const validateFormLogin = (form) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(form)
}

module.exports = {
    validateFormRegister,
    validateFormLogin
}