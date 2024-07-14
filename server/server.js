const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ethers } = require("ethers");
const axios = require("axios");

require("dotenv").config();

const endpoint =
  "https://api.studio.thegraph.com/query/83136/contracttracker/v0.0.1";

const query = `
  query {
    mints (first: 5) {
      blockNumber
    }
  }
`;

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let orders = [];

app.post("/api/orders", (req, res) => {
  const order = req.body;
  orders.push(order);
  console.log("Order created:", order);
  res.status(201).send({ message: "Order created", order });
});

app.get("/api/orders", (req, res) => {
  res.status(200).send(orders);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// async function fetchData() {
//   try {
//     const result = await axios.post(endpoint, {
//       query: query,
//     });
//     console.log(result.data);
//     return result.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// let isTriggered = false;
// let isFound = -1;

// setInterval(async () => {
//   let userData = await fetchData();

//   if (orders.length === 0) return;

//   for (let i = 0; i <= orders.length; i++) {
//     if (userData === orders[i].user) {
//       isFound *= -1;
//     }
//     if (isTriggered < 0) {
//       break;
//     }
//   }
// }, 100000);

// const API_KEY=process.env.ALCHEMY_API_KEY;
// const PRIVATE_KEY=process.env.PRIVATE_KEY;
// const CONTRACT_ABI=process.env.CONTRACT_ABI;

// const provider = new ethers.providers.InfuraProvider('baseSepolia', PRIVATE_KEY);
