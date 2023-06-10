const express = require('express');
const bodyParser = require('body-parser');
const expensesRouter = require('./routes/api.js')

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(new Date(), `${req.method} ${req.path}`);

    next();
})

app.use('/', expensesRouter);

app.listen(3000, () => {
    console.log('Running on 3000');
});
