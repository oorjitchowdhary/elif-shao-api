require('dotenv').config();
const app = require('express')();

app.get('/', (req, res) => {
    res.send('Welcome');
});

const authRouter = require('./routes/auth');
app.use('/', authRouter);

const port = process.env.PORT || 3000;

app.listen(port, err => {
    if (err) throw err;
    console.log(`Express server listening on port ${port}`);
});
