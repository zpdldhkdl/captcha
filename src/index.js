const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const svgCaptcha = require('./lib/svg-captcha');

dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.get('/captcha', async (req, res) => {
    const { returnText, data } = await svgCaptcha({ sha256: true });

    res.status(200).json({
        text: returnText,
        data: data
    });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`express server has started on port ${PORT}`);
});

