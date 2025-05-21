const express = require('express');
const router = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const config = new Configuration({
  basePath: process.env.PLAID_ENV === 'production' 
    ? PlaidEnvironments.production 
    : PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const client = new PlaidApi(config);

// Generate Link Token
router.post('/link-token', async (req, res) => {
  try {
    const response = await client.linkTokenCreate({
      user: { client_user_id: 'user-id' },
      client_name: 'Finance ML App',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating link token');
  }
});

// Exchange Public Token
router.post('/token-exchange', async (req, res) => {
  try {
    const { public_token } = req.body;
    const response = await client.itemPublicTokenExchange({ public_token });
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exchanging token');
  }
});

// Get All Financial Data
router.post('/financial-data', async (req, res) => {
  try {
    const { access_token } = req.body;
    
    // Get accounts
    const accountsResponse = await client.accountsGet({ access_token });
    
    // Get transactions
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 24);
    const transactionsResponse = await client.transactionsGet({
      access_token,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate,
    });
    
    // Get identity (if needed)
    const identityResponse = await client.identityGet({ access_token });

    res.json({
      accounts: accountsResponse.data.accounts,
      transactions: transactionsResponse.data.transactions,
      identity: identityResponse.data.accounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching financial data');
  }
});

module.exports = router;
