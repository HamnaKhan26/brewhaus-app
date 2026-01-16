const express = require('express');
const cors = require('cors');
const breweryRoutes = require('./routes/breweryRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/breweries', breweryRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
