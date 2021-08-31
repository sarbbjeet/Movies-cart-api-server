const randomCode = require("crypto-random-string");
const { secretValidate, SecretCode } = require("../module/secretCode");

const generateCode = () => {
    return randomCode({
        length: 6, //6 char long
    });
};

const secretCodeHandler = async(email) => {
    const code = generateCode();
    const { error } = secretValidate({ email, code });
    if (error) return { success: false, message: error.details[0].message }; //return null
    try {
        let secretCodeObject = new SecretCode({ email, code });
        secretCodeObject = await secretCodeObject.save();
        return { success: true, message: secretCodeObject };
    } catch (ex) {
        return { success: false, message: ex.message }; //return null
    }
};

module.exports = { secretCodeHandler };