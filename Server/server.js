const express = require('express');
const app = express();
require('dotenv').config();

app.listen(process.env.PORT, () => { console.log("Listening to port " + process.env.PORT)});
app.use(express.json({limit: "1mb"}));

app.use(express.static("../Public"));

app.post('/send', (req, res) => {
    let url = req.body.URL.toString();
    if (isValidHttpUrl(url)){
        console.log("Passed");
        let idAdd = generateUID(6);
        while (true){
            if (shortedUrlList.some(x => x.URL == url)){
                idAdd = shortedUrlList.find(x => x.URL == url).ID;
                break;
            }
            if (!shortedUrlList.some(x => x.ID == idAdd)){
                shortedUrlList.push({'ID': idAdd, 'URL': url})
                break;
            }
            idAdd = generateUID(6);
        }
        console.log(shortedUrlList);
        res.status(200).json({"URL": process.env.URL + idAdd})
    }
    else {
        console.log("NoPassed");
        res.status(400).send()
    }
})

app.get('/:id', (req, res) => {
    let idUrl = req.params.id;

    try {
        res.redirect(shortedUrlList.find(x => x.ID == idUrl).URL)
    }
    catch {
        res.send("Not valid link.")
    }
})

var shortedUrlList = [];

function generateUID(length)
{
    return Array(length).fill(0).map(x => Math.random().toString(36).charAt(2)).join('');
}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
      console.log("hello")
    } catch {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}