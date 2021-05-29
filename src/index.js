const express = require('express');
const app = express();


app.use(express.json());

app.listen(8000, () => {
    console.log("Server running at http://localhost:8000");
});

const songsRouter = require('./routes/routes');
app.use('/', songsRouter);