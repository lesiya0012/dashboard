require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const saleRoutes = require('./modules/sales/sale.route')
const companyRoutes = require('./modules/company/company.route');
const errorHandler = require('./middleware/error');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/sales', saleRoutes);
app.use("/api/company", companyRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);

connectDB(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
});