//Dependencies: 
//yarn add express cors twilio 

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

//twilio requirements -- Texting API 
const accountSid = 'AC1b4bb3f589c01850f35d95b0eb1be824';
const authToken = '6b73247a24fefb2914fb8900a7d86103';
const client = new twilio(accountSid, authToken);

const app = express(); //alias

app.use(cors()); //Blocks browser from restricting any data

//Welcome Page for the Server 
app.get('/token', (req, res, next) => {
    const { identity } = req.query;
    res.send({ token: authToken, identity, })
})
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server')
})
// Twilio For Calling
app.get('/calls', (req, res) => {
    //Send Text
    client.calls.create({
        // twiml: '<Response><Say>Ahoy there!</Say></Response>',
        url: 'http://demo.twilio.com/docs/voice.xml',
        to: '+923039839093',
        from: '+15866661768'
    })
        .then((call) => console.log("Result :", call.sid))
        .catch(err => console.log("Error :", err))
})
//Twilio For Sms
app.get('/send-text', (req, res) => {
    //Welcome Message
    // res.send('Hello to the Twilio Server')

    //_GET Variables
    const { recipient, textmessage } = req.query;


    //Send Text
    client.messages.create({
        body: textmessage,
        to: recipient,  // Text this number
        from: '+14064127506' // From a valid Twilio number
    })
        .then((message) => console.log("Result :", message.body))
        .catch(err => console.log("Error :", err))
})

app.listen(4000, () => console.log("Running on Port 4000"))
