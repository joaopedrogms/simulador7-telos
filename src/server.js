const express = require('express');

const moviesRoutes = require("./routes/movies.routes");

const app = express();

const port = 3333;

app.use(express.json());
app.use(moviesRoutes);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
