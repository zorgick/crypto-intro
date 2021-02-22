/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/block/latest', async (_, res) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: 'https://cloudflare-eth.com',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [
          'latest',
          true,
        ],
        id: 1,
      },
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

app.get('/api/block/:number', async (req, res) => {
  try {
    let hexBlockNumber = '-1';
    if (req.params.number === '-1') {
      hexBlockNumber = 'latest';
    } else if (req.params.number && Number.isInteger(Number(req.params.number))) {
      hexBlockNumber = `0x${Number(req.params.number).toString(16)}`;
    } else {
      throw new Error('Block number was not provided or is not a valid integer');
    }

    const { data } = await axios({
      method: 'POST',
      url: 'https://cloudflare-eth.com',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        jsonrpc: '2.0',
        method: 'eth_getBlockByNumber',
        params: [
          hexBlockNumber,
          true,
        ],
        id: 1,
      },
    });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

app.listen(process.env.REACT_APP_API_STAND || 8080);
