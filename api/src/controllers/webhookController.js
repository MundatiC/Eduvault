async function webhookController(req, res) {
  const webhookPayload = req.body;
 
  

  
    console.log(webhookPayload);
    res.status(200).send('Webhook received and processed successfully.');
}

module.exports = {webhookController};