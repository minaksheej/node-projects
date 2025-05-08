const URL = require('../models/Url');
const shortid = require('shortid');

async function handleCreateUrl(req,res) {
    const body = req.body;

    if(!body.url) return res.status(400).json({error: 'url is required!'});

    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []

})

return res.json({id: shortId});
    
};

async function handleAnaliticsForShortId(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalclicks: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {
    handleCreateUrl,
    handleAnaliticsForShortId,
}