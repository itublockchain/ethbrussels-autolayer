const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let orders = [];

app.post('/api/orders', (req, res) => {
  const order = req.body;
  orders.push(order);
  console.log('Order created:', order);
  res.status(201).send({ message: 'Order created', order });
});

app.get('/api/orders', (req, res) => {
  res.status(200).send(orders);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
