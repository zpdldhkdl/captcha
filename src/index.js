const express = require('express');
const app = express();
const dotenv = require('dotenv');
const svgCaptcha = require('./lib/svg-captcha');
const router = require('./router/index');

dotenv.config();

app.get('/captcha', async (req, res) => {
    const { returnText, data } = await svgCaptcha({ sha256: true });

    res.status(200).json({
        text: returnText,
        data: data
    });
});

// views set
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const PORT = process.env.PORT || 3000;

router(app);

app.listen(PORT, () => {
    console.log(`express server has started on port ${PORT}`);
});

