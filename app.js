require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const playerRouter = require('./routers/player.router');
const scoreRouter = require('./routers/score.router');

app.use(cors());
app.use(express.json());

app.use('/fastfingers/api/player', playerRouter);
app.use('/fastfingers/api/score', scoreRouter);

app.get('/fastfingers/api', (request, response) => {
    response.json({
        status: 'success',
        message: 'This is Fastfingers Node API ',
    });
});


app.listen(process.env.APP_PORT, () => {
    console.log(`Server Running On ${process.env.APP_PORT}`);
});