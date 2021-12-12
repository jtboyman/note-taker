const express = require('express');
const apiRoutes = require('./routes/apiRoutes/noteRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;


//parse incoming string data
app.use(express.urlencoded({ extended:true }));

//parse incoming JSON data
app.use(express.json());

//middleware
app.use(express.static('public'));

// /api for api routes, / for html routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});