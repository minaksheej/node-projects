const express = require("express");
const urlRoute = require('./router/url');
const staticRoute = require('./router/staticRouter');

const {connectToMongoDB} = require('./connect')
const URL = require('./models/Url');
const path = require('path')

const app = express();
const PORT = 8001;

//connect to mongoDB
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log("MongoDB Connected!")
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

//middleware to use json request
app.use(express.json());
app.use(express.urlencoded({extended: false}));




// Set the views directory
app.set('views', path.join(__dirname, 'views'));



app.use('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
 const entry = await URL.findOneAndUpdate({
        shortId
    },
    {
    $push: {
        visitHistory: {
            timeStamp: Date.now(),
        }
    },
}
)
res.redirect(entry.redirectUrl);
}
);

app.use("/url",urlRoute);
app.use("/", staticRoute);


app.listen(PORT, ()=>console.log(`Server started at Port: ${PORT}`));

