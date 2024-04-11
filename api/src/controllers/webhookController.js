const { createHmac } = require('crypto');
const { generateId } = require('zoo-ids'); // Assuming you have the zoo-ids library installed

async function webhookController(req, res) {
  const webhookPayload = req.body;
  const receivedSignature = req.headers['tally-signature'];
  const signingSecret = process.env.TALLY_SIGNING_SECRET;

  // Calculate the signature using the signing secret and the webhook payload
  const calculatedSignature = createHmac('sha256', signingSecret)
    .update(JSON.stringify(webhookPayload))
    .digest('base64');

  // Compare the received signature with the calculated signature
  if (receivedSignature !== calculatedSignature) {
    console.error('Invalid signature');
    res.status(401).send('Invalid signature');
    return;
  } else {
    console.log('Valid signature');
    const formData = webhookPayload.data;
    
    // Extract relevant fields from the form data
    const { fields } = formData;
    const firstName = fields.find(field => field.label === 'First Name');
    const lastName = fields.find(field => field.label === 'Last Name');
    const email = fields.find(field => field.label === 'Email address');
    const gender = fields.find(field => field.label === 'Gender');
    const dob = fields.find(field => field.label === 'Date Of Birth');

    // Generate unique pseudonym for the ID
    const uniquePseudonym = generateId(); // You can pass a seed if needed

    // Insert student data into the database
    try {
      const { pool } = req;
      if(pool.connected){
        let results = await pool
          .request()
          .input("id", uniquePseudonym)
          .input("first_name", firstName.value)
          .input("last_name", lastName.value)
          .input("email", email.value)
          .input("gender", gender.value)
          .input("date_of_birth", dob.value)
          .execute("InsertStudent");
      if (results.rowsAffected[0] > 0) {
        res.status(200).send('Student data inserted successfully');
      }
      
      }
    } catch (error) {
      res.status(500).send('Error inserting student data');
    }
  }
}

module.exports = { webhookController };
