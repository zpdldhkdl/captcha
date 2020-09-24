const svgCaptcha = require('svg-captcha');
const sha256 = require('sha256');

module.exports = async (options) => {
    options = {
        size: 8,
        noise: 2,
        sha256: false,
        ...options
    };

    const captcha = await svgCaptcha.create(options);

    const { text, data } = captcha;
    const returnText = options.sha256 ? sha256(text) : text;

    return { returnText, data };
};
