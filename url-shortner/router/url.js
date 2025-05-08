const express= require('express');

const router = express.Router();
const {handleCreateUrl,handleAnaliticsForShortId} = require('../controller/url');

router.post("/",handleCreateUrl);

router.get("/analytics/:shortId", handleAnaliticsForShortId);

module.exports = router;