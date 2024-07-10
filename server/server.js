const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const port = 8000;

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/jwt.config');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

require('./config/mongoose.config');
require('./routes/user.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`))