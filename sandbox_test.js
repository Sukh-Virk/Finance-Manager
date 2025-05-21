require('dotenv').config();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

console.log("🚀 Starting Plaid Sandbox test...");

async function main() {
  try {
    // 1) Initialize Plaid client
    console.log("\n1️⃣ Initializing Plaid client...");
    const client = new PlaidApi(new Configuration({
      basePath: PlaidEnvironments.sandbox,
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
          'PLAID-SECRET': process.env.PLAID_SECRET,
        },
      },
    }));

    // 2) Create sandbox public_token
    console.log("\n2️⃣ Creating sandbox public token...");
    const { data: { public_token } } = await client.sandboxPublicTokenCreate({
      institution_id: 'ins_109508',
      initial_products: ['transactions'],
      options: {
        webhook: 'https://example.com/webhook' // Required for immediate availability
      }
    });
    console.log("🔑 Public token:", public_token);

    // 3) Exchange for access_token
    console.log("\n3️⃣ Exchanging for access token...");
    const { data: { access_token } } = await client.itemPublicTokenExchange({ 
      public_token 
    });
    console.log("🔐 Access token:", access_token);

    // 4) Wait briefly for sandbox to initialize
    console.log("\n4️⃣ Waiting 2 seconds for sandbox to initialize...");
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 5) Get transactions
    console.log("\n5️⃣ Fetching transactions...");
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const { data } = await client.transactionsGet({
      access_token,
      start_date: startDate.toISOString().slice(0, 10),
      end_date: endDate.toISOString().slice(0, 10),
    });
    
    console.log("\n💳 Transaction Results:");
    console.log(`📅 Date range: ${startDate.toISOString().slice(0, 10)} to ${endDate.toISOString().slice(0, 10)}`);
    console.log(`🔢 Found ${data.transactions.length} transactions`);
    
    if (data.transactions.length > 0) {
      console.log("First transaction:", {
        name: data.transactions[0].name,
        amount: data.transactions[0].amount,
        date: data.transactions[0].date
      });
    } else {
      console.log("No transactions found. Try a different sandbox institution.");
    }

  } catch (error) {
    console.error("\n❌ Error:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

(async () => {
  await main();
  console.log("\n✨ Script completed!");
})();
