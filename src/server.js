const express = require('express');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.route');
const todoRouter = require('./routes/todo.route');
const bodyParser = require('body-parser');
const { authorizeRequest } = require('./middlewares/request-authorization');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/todo', authorizeRequest, todoRouter);

const port = process.env.PORT ?? 2020;
app.listen(port, () => {
    console.log(`[Server]: Started at ${port}`);
});