const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, () => { console.log("Listening to port " + process.env.PORT)});
app.use(express.json({limit: "1mb"}));

app.use(express.static("../Public"));

app.post('/send', (req, res) => {
    console.log(req.body);
})