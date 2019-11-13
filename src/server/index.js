const express = require('express');
var searchShops = require('./API/searchShops');
const app = express();

app.use(express.static('dist'));
app.get('/api/getBusiness', (req, res) => {
    const response = searchShops.getList().then(function(response){
        res.send({business: response});
    });
    
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
