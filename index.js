const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const refreshToken = require('./middlewares/refreshMiddleware');
const app = express();

// db configuration
require('./config');

// cross-platform compatibility
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(refreshToken);

// routers
app.use('/api', require('./routers'));

// dotenv configuation
dotenv.config({debug: false});
const PORT = process.env.PORT || 5000;

// server listening
app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`));
