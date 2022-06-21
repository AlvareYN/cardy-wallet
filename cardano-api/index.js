require('dotenv').config();
const express = require('express');
const logger = require('./src/utils/logger');
const cors = require('cors');
const walletRoutes = require('./src/routes/wallet.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
})
app.use("/wallet", walletRoutes)

app.listen(process.env.PORT || 4000, () => {
    logger.info(`Server started on port http://localhost:${process.env.PORT || 4000}/`);
})