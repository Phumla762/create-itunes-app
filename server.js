const express = require('express');
const app = express();
const fetch = require('node-fetch');
const helmet = require('helmet');
const path = require('path');
const publicPath = path.join(_dirname, '..', 'public');


app.use(express.static(publicPath));

// used dnsPreFetchControl to allow the browser to show all the included features with or without a header.
app.use(helmet());


const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//GET method for  music
app.get("/music/:query/:pageNumber", async (req, res) => {
    const query = req.params.query;
    const pageNumber = req.params.pageNumber;

    const api_url = `https://itunes.apple.com/search?term=${query}&media=music&${pageNumber}`;
    const fetch_res = await fetch(api_url);
    const json = fetch_res.json();
    res.json(json)
});

// GET method for music videos 
app.get("/video/:query/:pageNumber", async (req, res) => {
    const query = req.params.query;
    const pageNumber = req.params.pageNumber;

    const api_url = `https://itunes.apple.com/search?term=${query}&media=musicVideo&${pageNumber}`;
    const fetch_res =  await fetch(api_url);
    const json = fetch_res.json();
    res.json(json);
})

//GET method for movies
app.get("/movies/:query/:pageNumber", async (req, res) => {
    const query = req.params.query;
    const pageNumber = req.params.pageNumber;

    const api_url = `https://itunes.apple.com/search?term=${query}&media=movie&${pageNumber}`;
    const fetch_res =  await fetch(api_url);
    const json = fetch_res.json();
    res.json(json);
})

// GET method for audiobook
app.get("/audiobook/:query/:pageNumber", async (req, res) => {
    const query = req.params.query;
    const pageNumber = req.params.pageNumber;

    const api_url = `https://audiobook/itunes.apple.com/search?term=${query}&media=audiobook&${pageNumber}`;
    const fetch_res =  await fetch(api_url);
    const json = fetch_res.json();
    res.json(json);
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
    });
}



//Report errors
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something broke!");
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`this server is listening on port ${PORT}`);
});

